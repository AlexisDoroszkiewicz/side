import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Context } from "@components/FilterContext";
import { useContext } from "react";
import { css } from "@emotion/react";

export default function NumberSlider() {
	const { minWorker, setMinWorker } = useContext(Context);

	const marks = {
		0: 0,
		5: 5,
		10: 10,
	};
	return (
		<div
			css={css`
				width: 50%;
				@media (max-width: 640px) {
					display: none;
				}
			`}>
			<small
				css={css`
					text-align: center;
					width: 100%;
					display: block;
					font-size: 12px;
				`}>
				<>Minimum amount of workers required: {minWorker}</>
			</small>
			<Slider
				max={10}
				allowCross={false}
				marks={marks}
				onChange={(e) => setMinWorker(e)}
			/>
		</div>
	);
}
