// eslint-disable-next-line import/no-named-as-default
import prompts, {
  type Answers,
  type Choice,
  type Options,
  type PromptObject,
} from "prompts";
import { OmitKey } from "../../types/omit-key.type.js";

export async function promptSelect<C extends Choice, T extends string = string>(
  choices: C[],
  question: OmitKey<PromptObject<T>, "type"> &
    Required<Pick<PromptObject<T>, "message">>,
  options?: Options
) {
  return prompts({ ...question, type: "select", choices }, options) as Promise<
    OmitKey<Answers<T>, T> & { [P in T]: C["value"] | undefined }
  >;
}

export async function promptText<T extends string = string>(
  question: OmitKey<PromptObject<T>, "type">,
  options?: Options
) {
  const result = (await prompts(
    { ...question, type: "text" },
    options
  )) as Promise<OmitKey<Answers<T>, T> & { [P in T]: string | undefined }>;

  return result;
}
