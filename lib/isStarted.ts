import dayjs from "dayjs";

export default function isStarted(start: string | number | Date | dayjs.Dayjs) {
	if (dayjs() > dayjs(start)) return true;
	else return false;
}
