import dayjs from "dayjs"
import { css } from "@emotion/react";
import { Key, useContext, useLayoutEffect, useState } from "react";
import { Context } from "./Task";

export default function Shifts({opened, shifts, handleClick, ...props}) {
    // split shifts into ended and upcoming so we can render different tabs
    let upComingShifts = [];
    let endedShifts = [];

    shifts.forEach((shift) => {
        if (dayjs() > dayjs(shift.end)) endedShifts.push(shift);
        else upComingShifts.push(shift);
    })

    return (
        <div css={container(opened)}>     
            <div css={frame}>
                <div css={scrollContainer}>
                    <div css={menu}>
                        <div>title</div>
                        <button onClick={handleClick} css={closebtn}>
                            <svg   width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.596 8.11a.5.5 0 010 .708L13.414 12l3.182 3.182a.5.5 0 010 .707l-.707.707a.5.5 0 01-.707 0L12 13.414l-3.182 3.182a.5.5 0 01-.707 0l-.707-.707a.5.5 0 010-.707L10.586 12 7.404 8.818a.5.5 0 010-.707l.707-.707a.5.5 0 01.707 0L12 10.586l3.182-3.182a.5.5 0 01.707 0l.707.707z" fillRule="nonzero"></path></svg>
                        </button>
                    </div>
                    {upComingShifts.length != 0 && <ShiftsGrid shifts={upComingShifts}/>}
                    {endedShifts.length != 0 && <ShiftsGrid shifts={endedShifts}/>}
                </div>
            </div>
        </div>
    )
};

const ShiftsGrid = ({shifts, ...props}) => {
    
    return (
        <div css={grid} {...props}>
            {shifts.map((shift: { id: Key; }, i: number) => <Shift key={shift.id} index={i} length={shifts.length} shift={shift}/>)}
        </div>
    )
}

const container = (opened: boolean) => css`
    display: ${opened? 'grid' : 'none'};
    place-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00000080;
`
const frame = css`
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--black);
    position: relative;
`

const scrollContainer = css`
    height: 70vh;
    overflow-y: scroll;
    background: white;
`
const menu = css`
    position: sticky;
    top: 0;
    left: 0;
    background-color: var(--blueLight);
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 4rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
`

const closebtn = css`
    cursor: pointer;
    border: none;
    aspect-ratio: 1 / 1;
    display: grid;
    place-items: center;
    border-radius: 3px;
    border: 1px solid var(--black);
    svg {
        transform: scale(2);
        fill: var(--red);
    }
`

const grid = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 10rem), 1fr)) ;
    gap: 1rem;
    max-width: min(80vw, 1200px);
    padding: 2rem 4rem;
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
        // if at the last shift and expectedState unset, update state for count; counts double in development due to react18 behaviour, counting properly on the deployed version
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