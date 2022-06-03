import { css } from "@emotion/react";

export default function Status({ children }) {
	return <small css={status(children)}>{children}</small>;
}

const status = (status: string) => css`
	--color: ${status == "ongoing"
		? "var(--blue)"
		: status == "ready"
		? "var(--green)"
		: "var(--grey)"};
	color: var(--color);
	border: 2px solid var(--color);
	background-color: white;
	padding: 0.15em 0.5em;
	border-radius: 3px;
	font-weight: 500;
`;
