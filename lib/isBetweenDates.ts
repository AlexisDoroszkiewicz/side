import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export default function isBetweenDates(
	start: string | number | Date | dayjs.Dayjs,
	date: {
		start?: string | number | Date | dayjs.Dayjs;
		end?: string | number | Date | dayjs.Dayjs;
	}
) {
	if (
		!date.start ||
		!date.end ||
		dayjs(start).isBetween(date.start, date.end, "day", "[]")
	) {
		return true;
	} else return false;
}
