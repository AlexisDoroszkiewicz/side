import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Context } from "pages";
import { useContext } from "react";
import { css } from "@emotion/react";

export default function NumberSlider() {
	const { setMinWorker } = useContext(Context);

	const marks = {
		0: 0,
		20: 20,
		40: 40,
		60: 60,
		80: 80,
		100: 100,
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
				Minimum amount of workers required
			</small>
			<Slider
				defaultValue={[0, 80]}
				allowCross={false}
				marks={marks}
				onChange={(e) => setMinWorker(e)}
			/>
		</div>
	);
}
