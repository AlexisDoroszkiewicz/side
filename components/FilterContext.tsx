import { createContext, useState } from "react";
import dayjs from "dayjs";

export interface ContextProps {
	selected?: String;
	setSelected?: Function;
	date?: {
		start?: string | number | Date | dayjs.Dayjs;
		end?: string | number | Date | dayjs.Dayjs;
	};
	setDate?: Function;
	minWorker?: Number;
	setMinWorker?: Function;
}

export const Context = createContext<ContextProps>({
	selected: "",
	setSelected: () => {},
	date: { start: 0, end: 0 },
	setDate: () => {},
	minWorker: 0,
	setMinWorker: () => {},
});

export default function FilterContext({ children }) {
	// global filters
	const [selected, setSelected] = useState<String>();
	const [date, setDate] = useState<{
		start?: string | number | Date | dayjs.Dayjs;
		end?: string | number | Date | dayjs.Dayjs;
	}>({});
	const [minWorker, setMinWorker] = useState<Number>(0);

	return (
		<Context.Provider
			value={{
				selected,
				setSelected,
				date,
				setDate,
				minWorker,
				setMinWorker,
			}}>
			{children}
		</Context.Provider>
	);
}
