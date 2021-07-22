import React, { useState, useEffect, useRef } from 'react';
import Ajv from 'ajv';
import MonacoEditor from 'react-monaco-editor';
import { AntVSpec } from '../../src';
import specSchema from '../../build/antv-spec.json';
import testDemo from '../../examples/bar.json';
import { specToG2Plot, g2plotRender } from './adaptor';

const ajv = new Ajv();
const validateSchema = ajv.compile(specSchema);

function editorWillMount(monaco: any) {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    enableSchemaRequest: true,
    schemas: [
      {
        schema: specSchema,
        uri: 'https://gw.alipayobjects.com/os/antfincdn/bTUpx6VdQK/antv-spec.json',
      },
    ],
  });
}

export default function App() {
  const canvas = useRef(null);
  const chart = useRef(null);

  const [spec, setSpec] = useState(testDemo);

  function editorChange(newSpec: any) {
    setSpec(JSON.parse(newSpec));
  }

  useEffect(() => {
    if (validateSchema(spec)) {
      const g2plotCfg = specToG2Plot(spec as AntVSpec);
      // @ts-ignore
      if (chart.current && spec && g2plotCfg.chartType && chart.current.type === g2plotCfg.chartType.toLowerCase()) {
        // @ts-ignore
        chart.current.update(g2plotCfg.config);
      } else {
        if (chart.current) {
          // @ts-ignore
          chart.current.destroy();
        }
        // @ts-ignore
        const plot = g2plotRender(canvas.current, g2plotCfg);
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
