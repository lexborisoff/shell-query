import getArgs from "./getArgs";
import { urlPattern } from "../helpers/patterns";

const { _: args } = getArgs();

const withSearchQuery = args.some((arg) => !urlPattern.test(`${arg}`));

export default withSearchQuery;
