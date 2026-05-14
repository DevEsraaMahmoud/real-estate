import type en from "../messages/en.json";

type Messages = typeof en;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- augments next-intl message keys
  interface IntlMessages extends Messages {}
}

export {};
