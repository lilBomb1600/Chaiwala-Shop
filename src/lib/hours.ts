import { business } from "@/data/business";

/** minutes after midnight for "10:00 AM" / "9:00 PM" */
function toMinutes(t: string) {
  const [time, mer] = t.trim().split(" ");
  const [h, m] = time.split(":").map(Number);
  let hour = h % 12;
  if (mer === "PM") hour += 12;
  return hour * 60 + (m || 0);
}

export type DayHours = { day: string; open: number; close: number; label: string };

/** "10 AM to 9 PM" */
function short(t: string) {
  return t.trim().replace(":00", "");
}

export const week: DayHours[] = business.hours.map((h) => {
  const [o, c] = h.hours.split("–");
  return { day: h.day, open: toMinutes(o), close: toMinutes(c), label: `${short(o)} to ${short(c)}` };
});

/** 24h "HH:MM" for schema.org */
export function hhmm(min: number) {
  return `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
}

function fmt(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h >= 12 ? "PM" : "AM"}`;
}

/** the time right now in Concord */
function concordNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { weekday: get("weekday"), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export type Status = { open: boolean; today: string; line: string };

/** "Open now until 9 PM" / "Closed. Opens at 10 AM" */
export function status(now = new Date()): Status {
  const { weekday, minutes } = concordNow(now);
  const i = week.findIndex((d) => d.day === weekday);
  const today = week[i];
  if (minutes >= today.open && minutes < today.close) {
    return { open: true, today: weekday, line: `Open now until ${fmt(today.close)}` };
  }
  if (minutes < today.open) return { open: false, today: weekday, line: `Closed. Opens at ${fmt(today.open)}` };
  const next = week[(i + 1) % 7];
  return { open: false, today: weekday, line: `Closed. Opens tomorrow at ${fmt(next.open)}` };
}
