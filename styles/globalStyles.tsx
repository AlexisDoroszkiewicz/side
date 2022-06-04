import { css, Global } from "@emotion/react";
import CSSreset from "@styles/cssResets";

export const globalStyles = (
	<Global
		styles={css`
			${CSSreset}
			:root {
				--black: #272a2e;
				--blue: #3681ee;
				--blueLight: #ebf2fe;
				--blueDark: #115fcf;
				--skyBlue: #f7faff;
				--pink: #f498bc;
				--green: #41c5c5;
				--red: #f35d55;
				--orange: #ff7c42;
				--yellow: #ffc502;
				--redLight: hsla(3, 87%, 64%, 0.4);
				--orangeLight: hsla(18, 100%, 63%, 0.4);
				--yellowLight: hsla(46, 100%, 50%, 0.4);
				--greenLight: hsla(180, 53%, 51%, 0.4);
				--redSubtle: hsla(3, 87%, 64%, 0.1);
				--orangeSubtle: hsla(18, 100%, 63%, 0.05);
				--yellowSubtle: hsla(46, 100%, 50%, 0.05);
				--greenSubtle: hsla(180, 53%, 51%, 0.25);
				--grey: #5b616e;
				--greyLight: #adb2bd;
				--greySubtle: hsla(221, 11%, 7%, 0.01);
			}

			html {
				font-family: "Roboto", -apple-system, BlinkMacSystemFont,
					Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
					Droid Sans, Helvetica Neue, sans-serif;
				color: var(--black);
			}

			img {
				background-color: white;
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

			.react-datepicker-wrapper {
				width: auto;
			}

			.react-datepicker__input-container {
				input {
					padding-left: 1em;
					align-items: center;
					border-color: hsl(0, 0%, 80%);
					border-radius: 4px;
					border-style: solid;
					border-width: 1px;
					cursor: default;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					min-height: 38px;
					outline: 0 !important;
					position: relative;
					transition: all 100ms;
					box-sizing: border-box;
				}
			}
			.react-datepicker__day--keyboard-selected {
				background-color: var(--blue);
			}
			.rc-slider-handle {
				border-color: var(--blue);
			}
			.rc-slider-track {
				background-color: var(--blue);
			}
			.rc-slider-mark-text {
				color: var(--black);
			}
			.rc-slider-rail {
				background-color: #d4d4d4;
			}
		`}
	/>
);
