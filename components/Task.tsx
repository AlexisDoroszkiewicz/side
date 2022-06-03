import { useState, createContext, useLayoutEffect, useRef } from "react";
import { css } from "@emotion/react";
import dayjs from "dayjs";
import Applicants from "@components/Applicants";
import Shifts from "@components/Shifts";
import Status from "@components/Status"
import Target from "@components/Target";
import CloseBtn from "@components/CloseBtn";

// create context to avoid props drilling
interface ContextProps {
    [key: string]: any,
}
export const Context = createContext<ContextProps>({});

export default function Task({task, ...props}) {
    const {company, details, selection, shifts} = task;

    // ref to target task 🎯
    const taskRef: {current: HTMLDivElement} = useRef();

    // state to display shifts modal
    const [opened, setOpened] = useState(false);

    // "mission state", set by individual shifts, most impactful decides card color
    const [failing, setFailing] = useState(false); 
    const [short, setShort] = useState(false);
    const [closable, setClosable] = useState(false);
    const [noUpcomingShift, setNoUpcomingShift] = useState(false);

    // counter for how many temp workers required for this mission, total of non-ended shifts unfilled slots
    // we use a ref to prevent unecessary rerender and only set state at the last shift
    const expectedTempWorker = useRef(0);
    const [expectedTempState, setExpectedTempState] = useState(0);

    // if task has no shift, or all shifts are ended, set noUpcomingShift
    useLayoutEffect(() => {
        if (!shifts ||
            (shifts.every((shift: { end: string | number | Date | dayjs.Dayjs; }) => dayjs() > dayjs(shift.end)))) {
                setNoUpcomingShift(true);
        }
    // if task has shifts, and has 3 times more applicant than total amount of available slots, set closable
        else if (shifts && expectedTempState && details.applicants >= (expectedTempState *3)) {
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

    const closeTask = () => {
        // HERE -> API CALL TO SET TASK STATUS TO "CLOSED" 📞;
        taskRef.current.style.display = "none";
    }

    return (
        <div ref={taskRef} css={taskContainer(failing, short, closable, expectedTempState, noUpcomingShift)} {...props}>
            <div>
                <div css={css`display: flex; justify-content: space-between; align-items: flex-start`}>
                    <div css={css`display: flex; align-items: center; gap: 1rem; margin-bottom: 2em;`}>
                        {/* Should be using next Image component but had issues with AWS S3 domain config 🤷‍♂️ */}
                        <img src={company.pictureURL} width={"50"} height={"50"}/>
                        <div>
                            <h3>{company.name}</h3>
                            <p>{details.jobType} : <Status>{selection.status}</Status></p>
                        </div>
                    </div>
                    {/* If expectedTempState == 0 (either no upcoming shift or all slots filled), then show close btn ❌*/}
                    {expectedTempState == 0 && <CloseBtn handler={closeTask}/>}
                </div>

            </div>
            
            <div css={css`display: flex; justify-content: space-between; align-items: flex-end`}>
                <div>
                    <Target>{selection.target}</Target>
                    <Applicants amount={details.applicants} expected={expectedTempState}/>
                </div>
                <button css={button} onClick={handleClick} disabled={(!shifts)}>Shifts</button>
            </div>
            <Context.Provider value={{setFailing, setShort, expectedTempWorker, expectedTempState, setExpectedTempState}}>
                {shifts && <Shifts opened={opened} shifts={shifts} handleClick={handleClick} task={task}/>}
            </Context.Provider>
        </div>
    )
};

const taskContainer = (failing: boolean, short: boolean, closable: boolean, expectedTempState: number, noUpcomingShift: boolean) => css`
    /* order tasks */
    order: ${failing ? '-3' : short ? '-2' : closable ? '-1' : expectedTempState == 0 && '1'};
    border: 2px solid;
    border-color: ${failing ? 'var(--red)' : short ? 'var(--yellow)' : closable ? 'var(--green)' : 'var(--greyLight)'};
    background-color: ${failing ? 'var(--redSubtle)' : short ? 'var(--yellowSubtle)' : closable ? 'var(--greenSubtle)' : noUpcomingShift && 'var(--greySubtle)'};
    padding: 1rem; 
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    img {
        border: 1px solid var(--black);
        border-radius: 3px;
    }
`

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
    height: fit-content;
    &:hover {
        background-color: var(--blueDark);
    }
    &[disabled] {
        background-color: var(--greyLight);
    }
`