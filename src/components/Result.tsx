import { useAtomValue } from "jotai";
import { outputAtom } from "@/atoms/editor";
import CodeEditor from "@uiw/react-textarea-code-editor";

export function Result() {
  const output = useAtomValue(outputAtom);

  return (
    <section className="w-full">
      <CodeEditor
        value={output}
        language="js"
        placeholder="Output"
        onChange={(evn) => {}}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "transparent",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
        readOnly={true}
      />
    </section>
  );
}
