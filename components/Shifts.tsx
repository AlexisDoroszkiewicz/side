import dayjs from "dayjs"
import { css } from "@emotion/react";
import { Key, useContext, useLayoutEffect, useState } from "react";
import { Context } from "./Task";

export default function Shifts({shifts, ...props}) {
    

    return (
        <div css={container}>
            {shifts.map((shift: { id: Key; }, i: any) => <Shift key={shift.id} index={i} length={shifts.length} shift={shift}/>)}
        </div>
    )
};

const container = css`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    /* display: none; */
`

const Shift = ({shift, index, length, ...props}) => {
    const [setFailing, setShort, expectedTempWorker, expectedTempState, setExpectedTempState] = useContext(Context);
    const ended = dayjs() > dayjs(shift.end);
    const filled = (shift.slots == shift.filledSlots);
    const [localFailing, setLocalFailing] = useState(false);
    const [localShort, setLocalShort] = useState(false);
    const [localClosable, setLocalClosable] = useState(false);

    useLayoutEffect(() => {
        // if not ended, update temp worker count
        if (!ended) expectedTempWorker.current += (shift.slots - shift.filledSlots);
        // if shift began, is not ended, and slots not filled set failing to true
        if (!ended && (dayjs() > dayjs(shift.start)) && (shift.filledSlots < shift.slots)) {
            setFailing(true);
            setLocalFailing(true);
        }
        // else if shift begins within 24h, set short to true
        else if (dayjs(shift.start).diff(dayjs(), 'hour') < 24 &&  dayjs(shift.start).diff(dayjs(), 'hour') > 0) {
            setShort(true);
            setLocalShort(true);
        }
        // if at the last shift and expectedState unset, update state for count;
        if (index == length -1 && expectedTempState == 0) setExpectedTempState(expectedTempWorker.current);
    }, [])

    const startDay = dayjs(shift.start).format('DD/MM/YYYY');
    const endDay = dayjs(shift.end).format('DD/MM/YYYY');

    const startHour = dayjs(shift.start).format('HH:mm');
    const endHour = dayjs(shift.end).format('HH:mm');

    
    return (
        <div css={shiftContainer(ended, localFailing, localShort, filled)} {...props}>
            <small>
                <p>{startDay == endDay ? startDay : `Du ${startDay} au ${endDay}`}</p>
                <p>{startHour} <span css={css`color: var(--grey);`}>{`>`}</span> {endHour}</p>
            </small>
            <small css={css`display: flex; align-items: center;`}>
                <p>Filled slots {shift.filledSlots}/{shift.slots}</p> {filled ? 
                <svg css={css`fill: var(--green);`} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path id="checkmark-a" d="M10.67 15.82l-3.48-3.39c-.25-.23-.25-.45 0-.68l.68-.69c.25-.23.49-.23.71 0l2.43 2.4 5.4-5.29c.23-.23.47-.23.72 0l.68.65c.25.23.25.46 0 .69l-6.46 6.34c-.23.2-.46.2-.68-.03z"></path></svg> : 
                <svg css={css`fill: var(--red);`} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.89 8.818a.5.5 0 010 .707L13.414 12l2.474 2.476a.5.5 0 010 .707l-.707.707a.5.5 0 01-.707 0L12 13.414l-2.476 2.475a.5.5 0 01-.707 0l-.707-.707a.5.5 0 010-.707l2.475-2.476-2.475-2.474a.5.5 0 010-.707l.707-.707a.5.5 0 01.707 0l2.476 2.474 2.474-2.474a.5.5 0 01.707 0l.707.707z" fillRule="nonzero"></path></svg>}
            </small>
        </div>
    )
}

const shiftContainer = (ended: boolean, localFailing:boolean, localShort:boolean, filled: boolean) =>css`
    opacity: ${ended && 0.4};
    background-color: ${filled ? "var(--greenLight)" :localFailing ? "var(--redLight)" : localShort && "var(--yellowLight)"};
    border: 1px solid black;
    padding: 1em;
    border-radius: 3px;
`