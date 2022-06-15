import Editor, { OnChange } from "@monaco-editor/react";
import React from "react";
import PrimaryButton from "./Button";

interface EditorComponentProps {
  language?: string;
  code?: string;
  onChange: OnChange;
  onClickFunc: any
}

const EditorComponent: React.FC<EditorComponentProps> = ({
  language,
  code,
  onChange,
  onClickFunc
}) => {
  return (
    <div>
      <div className="h-10 bg-bgdark p-8 flex items-center justify-center">
        <PrimaryButton text="Run" onClickFunc={onClickFunc} />
      </div>
      <Editor
        className="text-xl"
        height="94vh"
        onChange={onChange}
        // defaultLanguage={language}
        language={language}
        value={code}
        theme="vs-dark"
        options={{ fontSize: 20 }}
      />
    </div>
  );
};

export default EditorComponent;