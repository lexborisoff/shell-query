import open, { openApp } from "open";
import { getQueryArgs } from "../command/args";
import {
  getBrowserArguments,
  getBrowserAppName,
  getProfile,
} from "../helpers/browser";

const { incognito } = getQueryArgs();

export default function openBrowser(
  browserName: string,
  profiles: string[],
  urls: string[]
): void {
  const browserAppName = getBrowserAppName(browserName);

  function handleOpen(callback: (browserArguments: string[]) => void) {
    if (profiles.length > 0) {
      profiles.forEach((profileNameOrAlias) => {
        const [, profile] = getProfile(browserName, profileNameOrAlias) ?? [];
        const browserArguments = getBrowserArguments(
          browserName,
          profile?.directory,
          incognito
        );

        callback(browserArguments);
      });
    } else {
      const browserArguments = getBrowserArguments(
        browserName,
        null,
        incognito
      );
      callback(browserArguments);
    }
  }

  // open URLs
  if (urls.length > 0) {
    urls.forEach((url) => {
      handleOpen((browserArguments) => {
        open(url, {
          app: { name: browserAppName, arguments: browserArguments },
        });
      });
    });
  }
  // open empty browser
  else {
    handleOpen((browserArguments) => {
      openApp(browserAppName, { arguments: browserArguments });
    });
  }
}
