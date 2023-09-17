import CodeEditor from "@uiw/react-textarea-code-editor";
import { useAtom } from "jotai";
import { inputAtom } from "@/atoms/editor";

export function Editor() {
  const [input, setInput] = useAtom(inputAtom);

  return (
    <section className="w-full h-full">
      <div className="relative h-full">
        <CodeEditor
          value={input}
          language="js"
          placeholder="Input"
          onChange={(evn) => setInput(evn.target.value)}
          padding={15}
          style={{
            fontSize: 12,
            backgroundColor: "transparent",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
      </div>
    </section>
  );
}
