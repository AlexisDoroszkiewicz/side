import { css } from "@emotion/react"

export default function CloseBtn({handler, ...props}) {
    return (
        <button onClick={handler} css={closebtn} {...props}>
            <svg   width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.596 8.11a.5.5 0 010 .708L13.414 12l3.182 3.182a.5.5 0 010 .707l-.707.707a.5.5 0 01-.707 0L12 13.414l-3.182 3.182a.5.5 0 01-.707 0l-.707-.707a.5.5 0 010-.707L10.586 12 7.404 8.818a.5.5 0 010-.707l.707-.707a.5.5 0 01.707 0L12 10.586l3.182-3.182a.5.5 0 01.707 0l.707.707z" fillRule="nonzero"></path></svg>
        </button>
    )
};

const closebtn = css`
    cursor: pointer;
    border: none;
    aspect-ratio: 1 / 1;
    display: grid;
    place-items: center;
    border-radius: 3px;
    background: none;
    svg {
        transform: scale(2);
        fill: var(--red);
    }
`