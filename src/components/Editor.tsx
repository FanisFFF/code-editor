import * as monaco from "monaco-editor";
import MonacoEditor, { OnChange } from "@monaco-editor/react";
import { FC } from "react";

const myTheme: monaco.editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#3e3e42",
    "editor.lineHighlightBackground": "#474749",
  },
};
monaco.editor.defineTheme("my-theme", myTheme);

interface IEditor {
  language: string;
  input: string;
  setInput: (value: string) => void;
}

const Editor: FC<IEditor> = ({ language, input, setInput }) => {
  const handleEditorChange: OnChange = (value) => {
    if (value !== undefined) {
      setInput(value);
    }
  };
  return (
    <MonacoEditor
      height="300px"
      language={language}
      value={input}
      onChange={handleEditorChange}
      theme="my-theme"
      beforeMount={(monaco) => {
        monaco.editor.defineTheme("my-theme", myTheme);
      }}
    />
  );
};
export default Editor;
