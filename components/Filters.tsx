import { css } from "@emotion/react";
import NumberSlider from "@components/NumberSlider";
import DropDown from "@components/DropDown";
import DateSlect from "@components/DateSelect";

export default function Filters() {
	return (
		<div
			css={css`
				padding-block: 1rem;
				position: sticky;
				top: 0;
				background-color: white;
				height: 6rem;
				z-index: 10;
				background: var(--blueLight);
				margin-bottom: 1rem;
				border-bottom: 1px solid #cfe0ff;
			`}>
			<div
				css={css`
					height: 100%;
					display: flex;
					align-items: center;
					gap: 1rem;
					max-width: 800px;
					margin-left: auto;
					margin-right: auto;
					padding-left: 1rem;
					padding-right: 1rem;
				`}>
				<DropDown />
				<DateSlect />
				<NumberSlider />
			</div>
		</div>
	);
}
