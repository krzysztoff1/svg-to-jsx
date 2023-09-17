import { Output } from "svgo";
import { Config } from "tailwind-merge";

declare module "svgo/dist/svgo.browser" {
  export function optimize(input: string, config?: Config): Output;
}
