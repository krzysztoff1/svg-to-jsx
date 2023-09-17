import { transformSvgToJsx } from "@/lib/transform";
import { atom } from "jotai";
import { transformerOptionsAtom } from "./transformerOptions";

const DEFAULT_INPUT = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.55293 0.999969C4.75295 0.999969 4.93372 1.11917 5.0125 1.30301L8.01106 8.29982C8.11984 8.55363 8.00226 8.84757 7.74844 8.95635C7.49463 9.06512 7.20069 8.94754 7.09191 8.69373L6.11613 6.41685H2.98973L2.01395 8.69373C1.90517 8.94754 1.61123 9.06512 1.35742 8.95635C1.1036 8.84757 0.986023 8.55363 1.0948 8.29982L4.09336 1.30301C4.17214 1.11917 4.35291 0.999969 4.55293 0.999969ZM4.55293 2.76929L5.75186 5.56685H3.354L4.55293 2.76929ZM11.0562 9.00214C11.2617 9.00214 11.4463 8.87633 11.5215 8.68502L14.2733 1.68299C14.3743 1.42598 14.2478 1.13575 13.9908 1.03475C13.7338 0.933747 13.4436 1.06021 13.3426 1.31722L11.0562 7.13514L8.76973 1.31722C8.66873 1.06021 8.3785 0.933747 8.1215 1.03475C7.86449 1.13575 7.73802 1.42598 7.83902 1.68299L10.5908 8.68502C10.666 8.87633 10.8506 9.00214 11.0562 9.00214ZM14.9537 12.4999C14.9537 12.606 14.9115 12.7077 14.8365 12.7828L12.8365 14.7828C12.6803 14.939 12.4271 14.939 12.2708 14.7828C12.1146 14.6265 12.1146 14.3733 12.2708 14.2171L13.588 12.8999H1.51937L2.83653 14.2171C2.99274 14.3733 2.99274 14.6265 2.83653 14.7828C2.68032 14.939 2.42705 14.939 2.27084 14.7828L0.270843 12.7828C0.195828 12.7077 0.153687 12.606 0.153687 12.4999C0.153687 12.3938 0.195828 12.2921 0.270843 12.2171L2.27084 10.2171C2.42705 10.0609 2.68032 10.0609 2.83653 10.2171C2.99274 10.3733 2.99274 10.6265 2.83653 10.7828L1.51937 12.0999L13.588 12.0999L12.2708 10.7828C12.1146 10.6265 12.1146 10.3733 12.2708 10.2171C12.4271 10.0609 12.6803 10.0609 12.8365 10.2171L14.8365 12.2171C14.9115 12.2921 14.9537 12.3938 14.9537 12.4999Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;

const _inputAtom = atom(DEFAULT_INPUT);

export const inputAtom = atom(
  (get) => get(_inputAtom),
  (get, set, update: string) => {
    set(_inputAtom, update);
    set(
      outputAtom,
      transformSvgToJsx({ input: update, options: get(transformerOptionsAtom) })
    );
  }
);

const retrievePreviousTransformerOptions = () => {
  const previousTransformerOptions = localStorage.getItem("transformerOptions");
  if (previousTransformerOptions) {
    return JSON.parse(previousTransformerOptions);
  }
  return {};
};

const _outputAtom = atom(
  transformSvgToJsx({
    input: DEFAULT_INPUT,
    options: retrievePreviousTransformerOptions(),
  })
);

export const outputAtom = atom(
  (get) => get(_outputAtom),
  (_get, set, update: string) => set(_outputAtom, update)
);
