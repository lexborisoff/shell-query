import openProfile from "./openProfile";
import openUrl from "./openUrl";
import { getArgs } from "../command";
import { getBrowserName } from "../helpers";
import { defaults } from "../data";

const args = getArgs();

async function openBrowserUrl(browser: string, url?: string) {
  const browserName = getBrowserName(browser);
  if (browserName) {
    // profile provided in args or in config defaults
    if (args.profile || defaults.profile) {
      await openProfile(browserName, url);
    }
    // profile NOT provided
    else {
      await openUrl(url, browserName);
    }
  }
}

export default async function openBrowser(url?: string) {
  if (args.browser) {
    // one browser provided
    if (!Array.isArray(args.browser)) {
      openBrowserUrl(args.browser, url);
    }
    // multiple browsers provided
    else {
      args.browser.forEach((browser) => {
        openBrowserUrl(browser, url);
      });
    }
  } else if (defaults.browser) {
    openBrowserUrl(defaults.browser, url);
  }
}
