import Shifts from "@components/Shifts";
import { css } from "@emotion/react";
import { useState, createContext, useEffect, useRef } from "react";
import dayjs from "dayjs";

// create context to avoid props drilling
export const Context = createContext([]);

export default function Task({task, ...props}) {
    const {company, details, selection, shifts} = task;

    // state to display shifts modal
    const [opened, setOpened] = useState(false);

    // "mission state", set by individual shifts, most impactful decides card color
    const [failing, setFailing] = useState(false); 
    const [short, setShort] = useState(false);
    const [closable, setClosable] = useState(false);

    // counter for how many temp workers required for this mission, total of non-ended shifts unfilled slots
    // we use a ref to prevent unecessary rerender and only set state at the last shift
    const expectedTempWorker = useRef(0);
    const [expectedTempState, setExpectedTempState] = useState(0);

    // if task has no shift, or all shifts are ended, or we have enough temp workers to fill ALL slots : set closable
    useEffect(() => {
        if (!shifts ||
            (shifts.every((shift: { end: string | number | Date | dayjs.Dayjs; }) => dayjs() > dayjs(shift.end))) ||
            (expectedTempState && details.applicants >= (expectedTempState *3))) {
                setClosable(true);
            }
    }, [expectedTempState])  
    // skip closed tasks ❌
    if (selection.status == 'closed') return;

    const handleClick = () => {
        setOpened(!opened);
        if (document.body.style.overflow == "hidden") document.body.style.removeProperty('overflow');
        else document.body.style.overflow = "hidden";
    }

    return (
        <div css={taskContainer(failing, short, closable)} {...props}>
            <div css={css`display: flex; align-items: center; gap: 1rem; margin-bottom: 1em;`}>
                {/* Should be using next Image component but had issues with AWS S3 domain config 🤷‍♂️ */}
                <img src={company.pictureURL} width={"50"} height={"50"}/>
                <div>
                    <h3>{company.name}</h3>
                    <p>{details.jobType}</p>
                </div>
            </div>
            <p><span css={label}>Target : </span>{selection.target}</p>
            <p><span css={label}>Status : </span>{selection.status}</p>
            <div css={css`display: flex; justify-content: space-between;`}>
                <div>
                    <p><span css={label}>Applicants : </span><span css={css``}>{details.applicants}</span> / <span css={css`color: ${expectedTempState == 0 && 'var(--red)'};`}>{expectedTempState}</span></p>
                </div>
                <button css={button} onClick={handleClick} disabled={(!shifts)}>Shifts</button>
            </div>
            <Context.Provider value={[setFailing, setShort, expectedTempWorker, expectedTempState, setExpectedTempState]}>
                {shifts && <Shifts opened={opened} shifts={shifts} handleClick={handleClick}/>}
            </Context.Provider>
        </div>
    )
};

const taskContainer = (failing: boolean, short: boolean, closable: boolean) => css`
    /* order tasks */
    order: ${failing ? '-3' : short ? '-2' : closable && '1'};
    border: 2px solid;
    border-color: ${failing ? 'var(--red)' : short ? 'var(--yellow)' : closable && 'var(--green)'};
    background-color: ${failing ? 'var(--redSubtle)' : short ? 'var(--yellowSubtle)' : closable && 'var(--greenSubtle)'};
    padding: 1rem; 
    border-radius: 3px;
    img {
        border: 1px solid var(--black);
        border-radius: 3px;
    }
`

const label = css`color: var(--grey);`

const button = css`
    padding: .5em 1em;
    background-color: var(--blue);
    border-radius: 4px;
    color: #FFFFFF;
    transition: all 300ms ease;
    overflow: hidden;
    align-items: center;
    cursor: pointer;
    border: none;
    &:hover {
        background-color: var(--blueDark);
    }
    &[disabled] {
        background-color: var(--greyLight);
    }
`