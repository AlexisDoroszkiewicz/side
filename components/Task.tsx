import Shifts from "@components/Shifts";
import { css } from "@emotion/react";
import { useState, createContext } from "react";

export const FailingContext = createContext([]);

export default function Task({task, ...props}) {
    const {company, details, selection, shifts} = task;

    const [failing, setFailing] = useState();    
    
    // skip closed tasks ❌
    if (selection.status == 'closed') return;

    return (
        <div css={css`background-color: ${failing && 'red'};`} {...props}>
            <div>
                {/* Should be using next Image component but had issues with AWS S3 domain config 🤷‍♂️ */}
                <img src={company.pictureURL} width={"100"} height={"100"}/>
                <h3>{company.name}</h3>
            </div>
            {(!shifts || selection.status == 'ready') && <h2>Closable</h2>}
            <p>{selection.target}</p>
            <p>{details.jobType}</p>
            <p>Applicants : {details.applicants}</p>
            <FailingContext.Provider value={[failing, setFailing]}>
                {shifts && <Shifts shifts={shifts} failingState={[failing, setFailing]}/>}
            </FailingContext.Provider>
        </div>
    )
};
