import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Option, alias, options } from "../options";
import { configFlags } from "../../data";

export default function getQueryArgs() {
  return yargs(hideBin(process.argv))
    .option(Option.Browser, {
      type: "string",
      alias: alias.browser,
      requireArg: true,
    })
    .option(Option.Profile, {
      type: "string",
      alias: alias.profile,
      requireArg: true,
    })
    .option(Option.Engine, {
      type: "string",
      alias: alias.engine,
      requireArg: true,
    })
    .option(Option.Route, {
      type: "string",
      alias: alias.route,
    })
    .option(Option.Incognito, {
      type: "boolean",
      alias: alias.incognito,
    })
    .option(Option.Split, {
      type: "boolean",
    })
    .option(Option.Http, {
      type: "boolean",
    })
    .help(false)
    .boolean(configFlags.filter((flag) => !options.includes(flag)))
    .parseSync();
}
