import open from "open";
import getBrowserArguments from "./getBrowserArguments";
import { getBrowserAppName, getProfile } from "../helpers";
import { defaults } from "../data";

export default async function openBrowserEmpty() {
  if (defaults.browser) {
    const browser = getBrowserAppName(defaults.browser);
    if (browser) {
      const defaultProfile = defaults.profile?.[defaults.browser];
      const profile =
        defaultProfile && getProfile(defaultProfile, defaults.browser);

      const browserArguments = getBrowserArguments(defaults.browser, profile);

      await open.openApp(browser, {
        arguments: browserArguments,
      });
    }
  }
}
