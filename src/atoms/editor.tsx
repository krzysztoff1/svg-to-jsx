import { transformSvgToJsx } from "@/lib/transform";
import { atom } from "jotai";

export const inputAtom = atom("");

export const outputAtom = atom((get) => {
  const input = get(inputAtom);

  return transformSvgToJsx({ input });
});
