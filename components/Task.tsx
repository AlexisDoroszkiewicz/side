import Shifts from "@components/Shifts";
import { css } from "@emotion/react";
import { useState, createContext } from "react";

export const FailingContext = createContext([]);

export default function Task({task, ...props}) {
    const {company, details, selection, shifts} = task;

    const [failing, setFailing] = useState();    
    const closable = (!shifts || selection.status == 'ready');

    // skip closed tasks ❌
    if (selection.status == 'closed') return;

    return (
        <div css={css`margin: 1rem; padding: 1rem; border: ${failing ? '4px solid var(--red)' : closable && '4px solid var(--green)'};`} {...props}>
            <div>
                {/* Should be using next Image component but had issues with AWS S3 domain config 🤷‍♂️ */}
                <img src={company.pictureURL} width={"100"} height={"100"}/>
                <h3>{company.name}</h3>
            </div>
            {closable && <h2>Closable</h2>}
            <p>{selection.target}</p>
            <p>{details.jobType}</p>
            <p>Applicants : {details.applicants}</p>
            <FailingContext.Provider value={[failing, setFailing]}>
                {shifts && <Shifts shifts={shifts} failingState={[failing, setFailing]}/>}
            </FailingContext.Provider>
        </div>
    )
};
