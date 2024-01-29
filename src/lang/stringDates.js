import moment from "moment";

export function prevDay(date) {
  return new moment(date, "YYYY-MM-DD").add(-1, "day").format("YYYY-MM-DD");
}

export function nextDay(date) {
  return new moment(date, "YYYY-MM-DD").add(1, "day").format("YYYY-MM-DD");
}

export function cmpDates(d1, d2) {
  d1 = new moment(d1, "YYYY-MM-DD");
  d2 = new moment(d2, "YYYY-MM-DD");
  if (d1.isBefore(d2, "day")) {
    return -1;
  }
  if (d2.isBefore(d1, "day")) {
    return 1;
  }
  return 0;
}
