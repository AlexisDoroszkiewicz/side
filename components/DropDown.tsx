import { useContext } from "react";
import { Context } from "pages";
import Select from "react-select";

export default function DropDown() {
	const { selected, setSelected } = useContext(Context);

	const options = [
		{ value: "new", label: "new" },
		{ value: "ongoing", label: "ongoing" },
		{ value: "ready", label: "ready" },
		{ value: "closed", label: "closed" },
	];

	return (
		<Select
			options={options}
			placeholder="tag"
			onChange={(e) => setSelected(e?.value)}
			instanceId={"tagFilter"}
			isClearable={true}
			styles={{
				container: (provided) => ({
					...provided,
					width: "10rem",
				}),
			}}
		/>
	);
}
