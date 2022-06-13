import { ContextProps } from "@components/FilterContext";
import isBetweenDates from "@lib/isBetweenDates";
import { Dayjs } from "dayjs";

export default function filterTasks(tasks: any[], filters: ContextProps) {
	const { selected, date, minWorker } = filters;

	// filter closed
	if (selected != "closed")
		tasks = tasks?.filter(
			(task: { selection: { status: string } }) =>
				task.selection.status != "closed"
		);

	// filter tag
	if (selected)
		tasks = tasks?.filter(
			(task: { selection: { status: any } }) =>
				task.selection.status == selected
		);

	// filter date
	if (date?.start && date?.end)
		tasks = tasks?.filter(
			(task: { shifts: { start: string | number | Date | Dayjs }[] }) =>
				task?.shifts?.some(
					(shift: { start: string | number | Date | Dayjs }) =>
						isBetweenDates(shift.start, date)
				)
		);

	// filter worker
	if (minWorker)
		tasks = tasks?.filter((task: { shifts: { slots: number }[] }) =>
			task?.shifts?.some(
				(shift: { slots: number }) => shift.slots >= minWorker
			)
		);

	return tasks;
}
