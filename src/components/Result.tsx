import { useAtomValue } from "jotai";
import { outputAtom } from "@/atoms/editor";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

export function Result() {
  const output = useAtomValue(outputAtom);

  const [isCopied, setIsCopied] = useState(false);

  return (
    <section className="w-full relative">
      <Button
        variant={"outline"}
        className="absolute top-0 right-0 m-2 z-10 p-1 shadow-md aspect-square"
        onClick={() => {
          navigator.clipboard.writeText(output);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        }}
      >
        {isCopied ? (
          <Check className="w-3 h-3" />
        ) : (
          <Copy className="w-3 h-3" />
        )}
      </Button>

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
