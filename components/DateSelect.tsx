import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useState } from "react";
import { Context } from "@components/FilterContext";

export default function DateSelect() {
	const { date, setDate } = useContext(Context);

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const onChange = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
		setDate({ start, end });
	};
	return (
		<div>
			<DatePicker
				selected={startDate}
				onChange={onChange}
				startDate={startDate}
				endDate={endDate}
				selectsRange
				selectsDisabledDaysInRange
				placeholderText={"date"}
				dateFormat={"dd/MM"}
				isClearable
			/>
		</div>
	);
}
