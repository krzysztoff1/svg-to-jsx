import { TransformerOptions, transformSvgToJsx } from "@/lib/transform";
import { atom } from "jotai";
import { inputAtom, outputAtom } from "./editor";
import { atomWithStorage } from "jotai/utils";

const DEFAULT_TRANSFORMER_OPTIONS: Required<TransformerOptions> = {
  componentName: "FancyIcon",
  componentType: "arrowFunction",
  replaceFillWithCurrentColor: false,
  replaceStrokeWithCurrentColor: false,
  transformToJsx: true,
};

const _transformerOptionsAtom = atomWithStorage<Required<TransformerOptions>>(
  "transformerOptions",
  DEFAULT_TRANSFORMER_OPTIONS
);
export const transformerOptionsAtom = atom(
  (get) => get(_transformerOptionsAtom),
  (get, set, newTransformerOptions: Required<TransformerOptions>) => {
    set(_transformerOptionsAtom, newTransformerOptions);
    set(
      outputAtom,
      transformSvgToJsx({
        input: get(inputAtom),
        options: get(transformerOptionsAtom),
      })
    );
  }
);
