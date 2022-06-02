import { css, Global } from "@emotion/react";
import CSSreset from "@styles/cssResets";

export const globalStyles = (
	<Global
		styles={css`
			${CSSreset}
			:root {
                --black: #272A2E;
                --green: #41C5C5;
				--red: #F35D55;
                --orange: #FF7C42;
                --yellow: #FFC502;
                --grey: #ADB2BD;
			}

            html {
                font-family: "Roboto", sans-serif;
                font-color: var(--black);
            }
		`}
	/>
);
