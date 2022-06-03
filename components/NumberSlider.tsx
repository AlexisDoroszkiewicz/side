import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Context } from "pages";
import { useContext } from "react";

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
		<Slider
			defaultValue={[0, 80]}
			allowCross={false}
			marks={marks}
			onAfterChange={(e) => setMinWorker(e)}
		/>
	);
}
