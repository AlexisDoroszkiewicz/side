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
                --redLight: hsla(3, 87%, 64%, .4);
                --orangeLight: hsla(18, 100%, 63%, .4);
                --yellowLight: hsla(46, 100%, 50%, .4);
                --greenLight: hsla(180, 53%, 51%, .2);
                --grey: #5B616E;
			}

            html {
                font-family: "Roboto", sans-serif;
                font-color: var(--black);
            }
		`}
	/>
);
