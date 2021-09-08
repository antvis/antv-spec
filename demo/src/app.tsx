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

export default function App() {
  const canvas = useRef(null);
  const chart = useRef(null);

  const [spec, setSpec] = useState(demos.areaDemo);

  function editorChange(newSpec: any) {
    setSpec(JSON.parse(newSpec));
  }

  useEffect(() => {
    if (validateSchema(spec)) {
      // check visualization type
      let visType;
      if (spec.basis.type === 'graph') {
        visType = 'graph';
      } else {
        visType = 'chart';
      }
      if (visType === 'chart') {
        specToG2Plot(spec as ChartAntVSpec, document.getElementById('container')!);
      } else if (visType === 'graph') {
        const g6Cfg = specToG6(spec as AntVSpec);
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
            defaultValue={JSON.stringify(spec, null, 2)}
            editorWillMount={editorWillMount}
            onChange={editorChange}
          />
        </div>
        <div id="container" ref={canvas} style={{ flex: 5, height: '600px' }}></div>
      </div>
      <p style={{ color: 'grey' }}>
        Attention: change encoding to `theta` and `color` before changing mark type to `arc`.
      </p>
    </div>
  );
}
