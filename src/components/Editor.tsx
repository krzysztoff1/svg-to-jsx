import { Textarea } from "./ui/textarea";
import { useAtom } from "jotai";
import { inputAtom } from "@/atoms/editor";

export function Editor() {
  const [input, setInput] = useAtom(inputAtom);

  return (
    <section className="w-full h-full">
      <div className="relative">
        <Textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </section>
  );
}
