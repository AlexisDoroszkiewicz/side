import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import { Context } from "pages";

export default function DateSelect(params) {
	const { date, setDate } = useContext(Context);
	return (
		<DatePicker selected={date} onChange={(date: Date) => setDate(date)} />
	);
}
