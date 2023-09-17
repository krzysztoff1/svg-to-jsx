// @ts-ignore
import { optimize } from "svgo/dist/svgo.browser";

const DEFAULT_COMPONENT_NAME = "FancyIcon";

interface CreateFunctionString {
  readonly componentName?: string;
  readonly jsx: string;
}

export function createArrowFunctionComponent({
  componentName = DEFAULT_COMPONENT_NAME,
  jsx,
}: CreateFunctionString): string {
  return ` 
export const ${componentName} = (props) => (
  ${jsx}
);
`;
}

export function createFunctionComponent({
  componentName = DEFAULT_COMPONENT_NAME,
  jsx,
}: CreateFunctionString): string {
  return `
export function ${componentName}(props) {
  return ${jsx}
}
`;
}

export function createArrowFunctionMemoComponent({
  componentName = DEFAULT_COMPONENT_NAME,
  jsx,
}: CreateFunctionString): string {
  return `
import { memo } from "react";

export const ${componentName} = memo((props) => (
  ${jsx}
));
`;
}

type TransformerOptions = {
  readonly componentName?: string;
  readonly addRoleImg?: boolean;
  readonly addAriaHidden?: boolean;
  readonly componentType?: "arrowFunction" | "function" | "arrowFunctionMemo";
};

interface TransformSvgToJsxProps {
  readonly input: string;
  readonly options?: TransformerOptions;
}

export function transformSvgToJsx({
  input,
  options = {},
}: TransformSvgToJsxProps): string {
  let optimizedSvgString = input;
  try {
    const result = optimize(input, {
      path: "icon.svg",
      multipass: true,
    });
    optimizedSvgString = result.data;
  } catch (e) {
    console.warn("Failed to optimize SVG", e);
  }

  const jsx = optimizedSvgString.replace("class=", "className=");

  switch (options.componentType) {
    case "arrowFunction": {
      return createArrowFunctionComponent({
        componentName: options.componentName,
        jsx,
      });
    }
    case "arrowFunctionMemo": {
      return createArrowFunctionMemoComponent({
        componentName: options.componentName,
        jsx,
      });
    }
    case "function":
    default: {
      return createFunctionComponent({
        componentName: options.componentName,
        jsx,
      });
    }
  }
}
