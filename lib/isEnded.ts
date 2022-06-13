import dayjs from "dayjs";

export default function isEnded(end: string | number | Date | dayjs.Dayjs) {
	if (dayjs() > dayjs(end)) return true;
	else return false;
}
