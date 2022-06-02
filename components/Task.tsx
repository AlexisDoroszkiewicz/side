import Shifts from "@components/Shifts";
import { css } from "@emotion/react";
import { useState, createContext, useEffect } from "react";
import dayjs from "dayjs";

// create context to prevent props drilling
export const Context = createContext([]);

export default function Task({task, ...props}) {
    const {company, details, selection, shifts} = task;

    const [failing, setFailing] = useState(false); 
    const [short, setShort] = useState(false);
    const [closable, setClosable] = useState(false);

    // skip closed tasks ❌
    if (selection.status == 'closed') return;
    // if task has no shift, or all shifts are ended, set closable
    useEffect(() => {
        if (!shifts || shifts.every((shift: { end: string | number | Date | dayjs.Dayjs; }) => dayjs() > dayjs(shift.end))) setClosable(true);
    }, [])  

    return (
        <div css={taskContainer(failing, short, closable)} {...props}>
            <div>
                {/* Should be using next Image component but had issues with AWS S3 domain config 🤷‍♂️ */}
                <img src={company.pictureURL} width={"100"} height={"100"}/>
                <h3>{company.name}</h3>
            </div>
            <p>{selection.target}</p>
            <p>{selection.status}</p>
            <p>{details.jobType}</p>
            <p>Applicants : {details.applicants}</p>
            <Context.Provider value={[setFailing]}>
                {shifts && <Shifts shifts={shifts}/>}
            </Context.Provider>
            {closable && <h2>CLOSABLE</h2>}
        </div>
    )
};

const taskContainer = (failing: boolean, short: boolean, closable: boolean) => css`
    /* order tasks */
    order: ${failing ? '-3' : short ? '-2' : closable && '1'};
    border: ${failing && '2px solid var(--red)'};
    padding: 1rem; 
    margin: 1rem;
`
