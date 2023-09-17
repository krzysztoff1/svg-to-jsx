import { useAtomValue } from "jotai";
import { Textarea } from "./ui/textarea";
import { outputAtom } from "@/atoms/editor";

export function Result() {
  const output = useAtomValue(outputAtom);

  return (
    <section className="w-full">
      <Textarea value={output} readOnly />
    </section>
  );
}
