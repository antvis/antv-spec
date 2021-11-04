import React, { useState, useEffect, useRef } from 'react';
import Ajv from 'ajv';
import MonacoEditor from 'react-monaco-editor';
import { ChartAntVSpec, GraphAntVSpec } from '../../src';
import specSchema from '../../build/antv-spec.json';
import demos from '../../examples';
import { specToG2Plot, specToG6Plot } from '../../src/adaptor';

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
  console.log('test valid', specStr);
  try {
    const spec = JSON.parse(specStr);
    return validateSchema(spec);
  } catch (error) {
    return false;
  }
};

export default function App() {
  const canvas = useRef(null);

  const [spec, setSpec] = useState<string>(JSON.stringify(demos.areaDemo));
  const [isValidSpec, setIsValidSpec] = useState<boolean>(isValid(spec));

  function editorChange(newSpec: string) {
    setSpec(newSpec);
  }

  const handleDataSelect = (e: any) => {
    const demoKey = e.target?.value;
    setSpec(JSON.stringify((demos as any)[demoKey]));
  };

  useEffect(() => {
    const isValidSpec = isValid(spec);
    setIsValidSpec(isValidSpec);

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
        specToG6Plot(specJSON as GraphAntVSpec, document.getElementById('container')!);
      }
    }
  }, [spec]);

  return (
    <div>
      <h2>antv-spec to G2Plot/G6Plot</h2>
      <div>
        Spec Examples:
        <select onChange={handleDataSelect} style={{ width: 160 }}>
          {Object.keys(demos).map((demoKey) => {
            return (
              <option value={demoKey} key={demoKey}>
                {demoKey}
              </option>
            );
          })}
        </select>
      </div>
      <div style={{ display: 'flex', marginTop: '50px' }}>
        <div style={{ flex: 5 }}>
          <MonacoEditor
            width="600"
            height="600"
            language="json"
            value={JSON.stringify(JSON.parse(spec), null, 2)}
            editorWillMount={editorWillMount}
            onChange={editorChange}
          />
        </div>
        {isValidSpec ? (
          <div id="container" key="vis" ref={canvas} style={{ flex: 5, height: '600px' }}></div>
        ) : (
          <div id="errormsg" key="err">
            <h2>invalid spec!</h2>
            <div id="container" key="vis" ref={canvas} style={{ flex: 5, height: '600px' }}></div>
          </div>
        )}
      </div>
      <p style={{ color: 'grey' }}>
        Attention: change encoding to `theta` and `color` before changing mark type to `arc`.
      </p>
    </div>
  );
}
