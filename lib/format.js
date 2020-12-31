import { DateTime } from "luxon";

export function formatDate(d) {
  const dt = new DateTime(d);
  return dt.setLocale("fr").toLocaleString();
}
