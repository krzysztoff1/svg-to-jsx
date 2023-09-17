import { Textarea } from "./ui/textarea";
import { useAtom } from "jotai";
import { inputAtom } from "@/atoms/editor";

export function Editor() {
  const [input, setInput] = useAtom(inputAtom);

  return (
    <section className="w-full h-full">
      <div className="relative h-full">
        <Textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          style={{ minHeight: "calc(100vh - 32rem)" }}
          className="w-full h-full p-4"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </section>
  );
}
