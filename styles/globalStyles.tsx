import { css, Global } from "@emotion/react";
import CSSreset from "@styles/cssResets";

export const globalStyles = (
	<Global
		styles={css`
			${CSSreset}
			:root {
                --black: #272A2E;
                --blue: #3681EE;
                --blueDark: #115fcf;
                --green: #41C5C5;
				--red: #F35D55;
                --orange: #FF7C42;
                --yellow: #FFC502;
                --redLight: hsla(3, 87%, 64%, .4);
                --orangeLight: hsla(18, 100%, 63%, .4);
                --yellowLight: hsla(46, 100%, 50%, .4);
                --greenLight: hsla(180, 53%, 51%, .4);
                --redSubtle: hsla(3, 87%, 64%, .05);
                --orangeSubtle: hsla(18, 100%, 63%, .05);
                --yellowSubtle: hsla(46, 100%, 50%, .05);
                --greenSubtle: hsla(180, 53%, 51%, .05);
                --grey: #5B616E;
                --greyLight: #ADB2BD;
			}

            html {
                font-family: "Roboto", sans-serif;
                font-color: var(--black);
            }
            /* width */
            ::-webkit-scrollbar {
            width: 6px;
            }

            /* Track */
            ::-webkit-scrollbar-track {
            background: #eee;
            }

            /* Handle */
            ::-webkit-scrollbar-thumb {
            background: var(--blue);
            }

            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
            background: var(--blueDark);
            }
		`}
	/>
);
