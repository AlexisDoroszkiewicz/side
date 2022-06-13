import dayjs from "dayjs";

export default function isShortNotice(
	start: string | number | Date | dayjs.Dayjs
) {
	if (
		dayjs(start).diff(dayjs(), "hour") <= 24 &&
		dayjs(start).diff(dayjs(), "hour") >= 0
	) {
		return true;
	} else return false;
}
