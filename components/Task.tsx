import Shifts from "@components/Shifts";
import { css } from "@emotion/react";
import { useState, createContext, useEffect } from "react";
import dayjs from "dayjs";

export const Context = createContext([]);

export default function Task({task, ...props}) {
    const {company, details, selection, shifts} = task;

    const [closable, setClosable] = useState(false);

    // skip closed tasks ❌
    if (selection.status == 'closed') return;
    // if task has no shift, or all shifts are ended, set closable
    useEffect(() => {
        if (!shifts || shifts.every(shift => dayjs() > dayjs(shift.end))) setClosable(true);
    }, [])

    const [failing, setFailing] = useState();    

    return (
        <div css={taskContainer(failing, closable)} {...props}>
            <div>
                {/* Should be using next Image component but had issues with AWS S3 domain config 🤷‍♂️ */}
                <img src={company.pictureURL} width={"100"} height={"100"}/>
                <h3>{company.name}</h3>
            </div>
            <p>{selection.target}</p>
            <p>{details.jobType}</p>
            <p>Applicants : {details.applicants}</p>
            <Context.Provider value={[setFailing]}>
                {shifts && <Shifts shifts={shifts}/>}
            </Context.Provider>
        </div>
    )
};

const taskContainer = (failing, closable) => css`
    /* if task is closable, push it to the bottom of the list */
    order: ${closable && '1'};
    padding: 1rem; 
    margin: 1rem;
    border: ${failing && '2px solid var(--red)'};
`
