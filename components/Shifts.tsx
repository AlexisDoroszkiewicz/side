import dayjs from "dayjs"
import { css } from "@emotion/react";
import { Key } from "react";
import Shift from "./Shift";
import CloseBtn from "@components/CloseBtn";

export default function Shifts({opened, shifts, handleClick, task, ...props}) {

    // split shifts into ended and upcoming so we can render different tabs
    // Should refacto -> use REACT PORTALS instead to move shifts in corresponding tab
    let upComingShifts = [];
    let endedShifts = [];

    shifts.forEach((shift) => {
        if (dayjs() > dayjs(shift.end)) endedShifts.push(shift);
        else upComingShifts.push(shift);
    })

    // close modal if clicking on overlay background
    const closeModal = (e) => {
        if (e.target == e.currentTarget) handleClick();
    }

    return (
        <div css={container(opened)} onClick={e => closeModal(e)}>     
            <div css={frame}>
                <div css={scrollContainer}>
                    <div css={menu}>
                        <div>
                            <h3 css={css`display: inline;`}>{task.company.name}</h3> - {task.details.jobType}
                        </div>
                        <CloseBtn handler={handleClick}/>
                    </div>
                    {upComingShifts.length != 0 && <ShiftsGrid shifts={upComingShifts}/>}
                    {upComingShifts.length != 0 && endedShifts.length != 0 && <hr></hr>}
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
    @media(max-width: 640px) {
        height: 95vh;
    }
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

const grid = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 10rem), 1fr)) ;
    gap: 1rem;
    max-width: min(80vw, 1200px);
    padding: 2rem 4rem;
`