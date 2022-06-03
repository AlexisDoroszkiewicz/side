import { css } from "@emotion/react";

export default function Applicants({ amount, expected, ...props }) {
	return (
		<p {...props}>
			<span
				css={css`
					color: var(--grey);
				`}>
				Applicants :{" "}
			</span>
			{amount} /{" "}
			<span
				css={css`
					color: ${expected == 0 && "var(--red)"};
				`}>
				{expected}
			</span>{" "}
			{amount >= expected * 3 && expected != 0 && "✅"}
		</p>
	);
}
