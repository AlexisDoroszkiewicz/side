import Shifts from "@components/Shifts";
import { css } from "@emotion/react";
import { useState, createContext, useEffect, useRef } from "react";
import dayjs from "dayjs";

// create context to prevent props drilling
export const Context = createContext([]);

export default function Task({task, ...props}) {
    const {company, details, selection, shifts} = task;

    const [failing, setFailing] = useState(false); 
    const [short, setShort] = useState(false);
    const [closable, setClosable] = useState(false);

    // counter for how many temp workers required for this mission, total of not ended shifts unfilled slots
    const expectedTempWorker = useRef(0);

    const [expectedTempState, setExpectedTempState] = useState(0);

    // skip closed tasks ❌
    if (selection.status == 'closed') return;
    // if task has no shift, or all shifts are ended, set closable
    useEffect(() => {
        if (!shifts || shifts.every((shift: { end: string | number | Date | dayjs.Dayjs; }) => dayjs() > dayjs(shift.end))) setClosable(true);
    }, [])  

    return (
        <div css={taskContainer(failing, short, closable)} {...props}>
            <div css={css`display: flex; align-items: center; gap: 1rem;`}>
                {/* Should be using next Image component but had issues with AWS S3 domain config 🤷‍♂️ */}
                <img src={company.pictureURL} width={"50"} height={"50"}/>
                <div>
                    <h3>{company.name}</h3>
                    <p>{details.jobType}</p>
                </div>
            </div>
            <p>{selection.target}</p>
            <p>{selection.status}</p>
            <p>Applicants : {details.applicants}</p>
            <p>Expected : {expectedTempState}</p>
            <Context.Provider value={[setFailing, setShort, expectedTempWorker, expectedTempState, setExpectedTempState]}>
                {shifts && <Shifts shifts={shifts}/>}
            </Context.Provider>
            {closable && <h2>CLOSABLE</h2>}
        </div>
    )
};

const taskContainer = (failing: boolean, short: boolean, closable: boolean) => css`
    /* order tasks */
    order: ${failing ? '-3' : short ? '-2' : closable && '1'};
    padding: 1rem; 
    margin: 1rem;
`
