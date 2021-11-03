import React, { useState, useEffect, useRef } from 'react';
import Ajv from 'ajv';
import MonacoEditor from 'react-monaco-editor';
import { AntVSpec, ChartAntVSpec } from '../../src';
import specSchema from '../../build/antv-spec.json';
import demos from '../../examples';
import { specToG2Plot } from '../../src/adaptor';
import { specToG6 } from './adaptor/spec-g6';
import { g6Render } from './render/g6Render';

const ajv = new Ajv();
const validateSchema = ajv.compile(specSchema);

function editorWillMount(monaco: any) {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    enableSchemaRequest: true,
    schemas: [
      {
        schema: specSchema,
        uri: 'https://gw.alipayobjects.com/os/antfincdn/WGPnH2dl9L/antv-spec.json',
      },
    ],
  });
}

const isValid = (specStr: string) => {
  try {
    const spec = JSON.parse(specStr);
    return validateSchema(spec);
  } catch (error) {
    return false;
  }
};

export default function App() {
  const canvas = useRef(null);
  const chart = useRef(null);

  const [spec, setSpec] = useState<string>(JSON.stringify(demos.areaDemo));
  const [isValidSpec, setIsValidSpec] = useState<boolean>(isValid(spec));

  function editorChange(newSpec: string) {
    setSpec(newSpec);
  }

  useEffect(() => {
    setIsValidSpec(isValid(spec));

    if (isValidSpec) {
      const specJSON = JSON.parse(spec);

      // check visualization type
      let visType;
      if (specJSON.basis.type === 'graph') {
        visType = 'graph';
      } else {
        visType = 'chart';
      }
      if (visType === 'chart') {
        specToG2Plot(specJSON as ChartAntVSpec, document.getElementById('container')!);
      } else if (visType === 'graph') {
        const g6Cfg = specToG6(specJSON as AntVSpec);
        if (chart.current) {
          // @ts-ignore
          chart.current.destroy();
        }
        // @ts-ignore
        const plot = g6Render(canvas.current, g6Cfg);
        // @ts-ignore
        chart.current = plot;
      }
    }
  }, [spec]);

  return (
    <div>
      <h2>antv-spec to G2Plot</h2>
      <div style={{ display: 'flex', marginTop: '50px' }}>
        <div style={{ flex: 5 }}>
          <MonacoEditor
            width="600"
            height="600"
            language="json"
            defaultValue={JSON.stringify(JSON.parse(spec), null, 2)}
            editorWillMount={editorWillMount}
            onChange={editorChange}
          />
        </div>
        {isValidSpec ? (
          <div id="container" key="vis" ref={canvas} style={{ flex: 5, height: '600px' }}></div>
        ) : (
          <div id="errormsg" key="err">
            <h2>invalid spec!</h2>
          </div>
        )}
      </div>
      <p style={{ color: 'grey' }}>
        Attention: change encoding to `theta` and `color` before changing mark type to `arc`.
      </p>
    </div>
  );
}
