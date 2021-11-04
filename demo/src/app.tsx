import React, { useState, useEffect, useRef } from 'react';
import Ajv from 'ajv';
import MonacoEditor from 'react-monaco-editor';
import { Select } from 'antd';
import { ChartAntVSpec, GraphAntVSpec } from '../../src';
import specSchema from '../../build/antv-spec.json';
import demos from '../../examples';
import { specToG2Plot, specToG6Plot } from '../../src/adaptor';
import './index.less';

const { Option } = Select;

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

const formatJSONObject = (json: Object): string => {
  return JSON.stringify(json, null, 2);
};

export default function App() {
  const canvas = useRef(null);

  const [currentDemo, setCurrentDemo] = useState<string>(Object.keys(demos)[1]);

  const defaultSpec = (demos as any)[currentDemo];

  const [lastValidSpec, setLastValidSpec] = useState<any>(defaultSpec);
  const [editorContent, _setEditorContent] = useState<string>(formatJSONObject(defaultSpec));

  const setEditorContent = (editorContent: string) => {
    if (isValid(editorContent)) {
      setLastValidSpec(JSON.parse(editorContent));
    }
    _setEditorContent(editorContent);
  };

  const editorChange = (newSpec: string) => {
    setEditorContent(newSpec);
  };

  const handleDataSelect = (value: any) => {
    const demoKey = value;
    setCurrentDemo(demoKey);
    setEditorContent(formatJSONObject((demos as any)[demoKey]));
  };

  useEffect(() => {
    // check visualization type
    const visType = lastValidSpec.basis?.type === 'graph' ? 'graph' : 'chart';

    if (canvas.current) {
      switch (visType) {
        case 'graph':
          specToG6Plot(lastValidSpec as GraphAntVSpec, canvas.current);
          break;
        case 'chart':
          specToG2Plot(lastValidSpec as ChartAntVSpec, canvas.current);
          break;
        default:
          break;
      }
    }
  }, [lastValidSpec]);

  return (
    <div>
      <h2>antv-spec to G2Plot/G6Plot</h2>
      <div>
        Spec Examples:
        <Select defaultValue={currentDemo} style={{ width: 160, margin: '0 10px' }} onChange={handleDataSelect}>
          {Object.keys(demos).map((demoKey) => (
            <Option value={demoKey} key={demoKey}>
              {demoKey}
            </Option>
          ))}
        </Select>
      </div>
      <div style={{ display: 'flex', marginTop: '50px' }}>
        <div style={{ flex: 5 }}>
          <MonacoEditor
            width="90%"
            height="600"
            language="json"
            value={editorContent}
            editorWillMount={editorWillMount}
            onChange={editorChange}
          />
        </div>
        <div className="vis-wrapper">
          <div
            id="container"
            className="vis"
            ref={canvas}
            style={!isValid(editorContent) ? { opacity: 0.4 } : {}}
          ></div>
          <div id="errormsg" className="vis-mask" style={!isValid(editorContent) ? { bottom: 0 } : {}}>
            <h2>invalid spec!</h2>
          </div>
        </div>
      </div>
      <p style={{ color: 'grey' }}>
        Attention: change encoding to `theta` and `color` before changing mark type to `arc`.
      </p>
    </div>
  );
}
