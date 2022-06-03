import { css } from "@emotion/react"

export default function Target({children, ...props}) {
    return (
        <p {...props}>
            <span css={css`color: var(--grey);`}>Target : </span><strong css={css`font-weight: 500;`}>{children}</strong>
        </p>
    )
};
