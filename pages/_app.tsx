import type { AppProps } from "next/app";
import { globalStyles } from "@styles/globalStyles";
import FilterContext from "@components/FilterContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			{globalStyles}
			<FilterContext>
				<Component {...pageProps} />
			</FilterContext>
		</>
	);
}

export default MyApp;
