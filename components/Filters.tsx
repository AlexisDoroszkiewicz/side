import { css } from "@emotion/react";
import Slider from "@components/Slider";
import DropDown from "@components/DropDown";
import DateSlect from "@components/DateSelect";

export default function Filters() {
	return (
		<div
			css={css`
				display: flex;
				align-items: center;
				gap: 1rem;
				padding-block: 1rem;
				position: sticky;
				top: 0;
				background-color: white;
			`}>
			<DropDown />
			<DateSlect />
			<Slider />
		</div>
	);
}
