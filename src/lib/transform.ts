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
  return `export const ${componentName} = () => (
  ${jsx}
);`;
}

export function createFunctionComponent({
  componentName = DEFAULT_COMPONENT_NAME,
  jsx,
}: CreateFunctionString): string {
  return `export function ${componentName}() {
  return ${jsx}
}`;
}

export function createArrowFunctionMemoComponent({
  componentName = DEFAULT_COMPONENT_NAME,
  jsx,
}: CreateFunctionString): string {
  return `import { memo } from "react";

export const ${componentName} = memo(() => (
  ${jsx}
));`;
}

export type TransformerComponentType =
  | "arrowFunction"
  | "function"
  | "arrowFunctionMemo";

export type TransformerOptions = {
  readonly componentName?: string;
  readonly replaceFillWithCurrentColor?: boolean;
  readonly replaceStrokeWithCurrentColor?: boolean;
  readonly componentType?: TransformerComponentType;
  readonly transformToJsx?: boolean;
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

  if (options.replaceFillWithCurrentColor) {
    optimizedSvgString = optimizedSvgString.replaceAll(
      /fill="[^"]*"/g,
      'fill="currentColor"'
    );
  }

  if (options.replaceStrokeWithCurrentColor) {
    optimizedSvgString = optimizedSvgString.replaceAll(
      /stroke="[^"]*"/g,
      'stroke="currentColor"'
    );
  }

  if (!options.transformToJsx) {
    return optimizedSvgString;
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
