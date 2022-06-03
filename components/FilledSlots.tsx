import { css } from "@emotion/react"

export default function FilledSlots({filledSlots, slots}) {
    const filled = (filledSlots >= slots);
    
    return (
        <small css={container(filled)}>
            <p><span css={css`color: var(--grey);`}>Filled slots : </span> {filledSlots}/{slots}</p> {filled ? 
            <svg css={css`fill: var(--green);`} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path id="checkmark-a" d="M10.67 15.82l-3.48-3.39c-.25-.23-.25-.45 0-.68l.68-.69c.25-.23.49-.23.71 0l2.43 2.4 5.4-5.29c.23-.23.47-.23.72 0l.68.65c.25.23.25.46 0 .69l-6.46 6.34c-.23.2-.46.2-.68-.03z"></path></svg> : 
            <svg css={css`fill: var(--red);`} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.89 8.818a.5.5 0 010 .707L13.414 12l2.474 2.476a.5.5 0 010 .707l-.707.707a.5.5 0 01-.707 0L12 13.414l-2.476 2.475a.5.5 0 01-.707 0l-.707-.707a.5.5 0 010-.707l2.475-2.476-2.475-2.474a.5.5 0 010-.707l.707-.707a.5.5 0 01.707 0l2.476 2.474 2.474-2.474a.5.5 0 01.707 0l.707.707z" fillRule="nonzero"></path></svg>}
        </small>
    )
};

const container = (filled: boolean) => css`
    background: white;
    width: fit-content;
    padding-left: 0.5em;
    border-radius: 3px;
    border: 1px solid ${filled ? 'var(--green)' : 'var(--red)'};
    display: flex; align-items: center;
`