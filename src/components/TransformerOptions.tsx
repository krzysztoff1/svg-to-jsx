import { transformerOptionsAtom } from "@/atoms/transformerOptions";
import { useAtom } from "jotai";
import { Checkbox } from "./ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ComponentType } from "react";
import { TransformerComponentType } from "@/lib/transform";

interface CheckBoxRowProps {
  readonly onCheckedChange: (checked: boolean) => void;
  readonly checked: boolean;
  readonly id: string;
  readonly label: string;
  readonly description?: string;
}

function CheckBoxRow({
  id,
  label,
  checked,
  onCheckedChange,
  description,
}: CheckBoxRowProps) {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          {label}
        </label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

interface SelectRowProps {
  readonly id: string;
  readonly label: string;
  readonly options: { label: string; value: string }[];
  readonly value: string;
  readonly onValueChange: (value: string) => void;
  readonly description?: string;
}

function SelectRow({
  id,
  label,
  options,
  value,
  onValueChange,
  description,
}: SelectRowProps) {
  return (
    <div className="items-top flex space-x-2">
      <div className="grid gap-3">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          {label}
        </label>

        <Select onValueChange={onValueChange} value={value}>
          <SelectTrigger>
            <SelectValue placeholder={label} />
          </SelectTrigger>

          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

export function TransformerOptions() {
  const [options, setOptions] = useAtom(transformerOptionsAtom);

  return (
    <section className="flex flex-col gap-4 m-4">
      <Card>
        <CardHeader>
          <CardTitle>Options</CardTitle>
          <CardDescription>Options for the transformer</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 grid-cols-2">
          <CheckBoxRow
            id="transformToJsx"
            label="Transform to JSX"
            checked={options.transformToJsx}
            onCheckedChange={(checked) =>
              setOptions({ ...options, transformToJsx: checked })
            }
            description="Transforms the SVG to JSX React components."
          />

          <SelectRow
            id="reactComponentType"
            label="React component type"
            options={[
              { label: "Arrow function", value: "arrowFunction" },
              { label: "Function", value: "function" },
              {
                label: "Memoized arrow function",
                value: "arrowFunctionMemo",
              },
            ]}
            value={options.componentType}
            onValueChange={(value) => {
              setOptions({
                ...options,
                componentType: value as TransformerComponentType,
              });
            }}
            description="The type of React component to generate."
          />

          <CheckBoxRow
            id="replaceFillWithCurrentColor"
            label="Replace fill with currentColor"
            checked={options.replaceFillWithCurrentColor}
            onCheckedChange={(checked) =>
              setOptions({ ...options, replaceFillWithCurrentColor: checked })
            }
            description="Replaces all fill attributes with currentColor."
          />

          <CheckBoxRow
            id="replaceStrokeWithCurrentColor"
            label="Replace stroke with currentColor"
            checked={options.replaceStrokeWithCurrentColor}
            onCheckedChange={(checked) =>
              setOptions({ ...options, replaceStrokeWithCurrentColor: checked })
            }
            description="Replaces all fill attributes with currentColor."
          />
        </CardContent>

        <CardFooter>
          <p className="text-sm text-muted-foreground">
            <a
              href="https://github.com/krzysztoff1/svg-to-jsx"
              target="_blank"
              rel="noreferrer"
              className="underline cursor-pointer"
            >
              Source code
            </a>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
