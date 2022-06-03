import dayjs from "dayjs"
import { css } from "@emotion/react";
import { Key } from "react";
import Shift from "./Shift";

export default function Shifts({opened, shifts, handleClick, task, ...props}) {

    // split shifts into ended and upcoming so we can render different tabs
    // Should refacto -> use REACT PORTALS instead to move shifts in corresponding tab
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
                        <div><h3 css={css`display: inline;`}>{task.company.name}</h3> - {task.details.jobType}</div>
                        <button onClick={handleClick} css={closebtn}>
                            <svg   width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.596 8.11a.5.5 0 010 .708L13.414 12l3.182 3.182a.5.5 0 010 .707l-.707.707a.5.5 0 01-.707 0L12 13.414l-3.182 3.182a.5.5 0 01-.707 0l-.707-.707a.5.5 0 010-.707L10.586 12 7.404 8.818a.5.5 0 010-.707l.707-.707a.5.5 0 01.707 0L12 10.586l3.182-3.182a.5.5 0 01.707 0l.707.707z" fillRule="nonzero"></path></svg>
                        </button>
                    </div>
                    {upComingShifts.length != 0 && <ShiftsGrid shifts={upComingShifts}/>}
                    {endedShifts.length != 0 && <div><ShiftsGrid shifts={endedShifts}/></div>}
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
    background: none;
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