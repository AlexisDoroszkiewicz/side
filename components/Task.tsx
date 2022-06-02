import Shifts from "@components/Shifts";
import { css } from "@emotion/react";

export default function Task({task, ...props}) {
    const {company, details, selection, shifts} = task;

    // skip closed tasks ❌
    if (selection.status == 'closed') return;

    return (
        <div {...props}>
            <div>
                {/* Should be using next Image component but had issues with AWS S3 domain config 🤷‍♂️ */}
                <img src={company.pictureURL} width={"100"} height={"100"}/>
                <h3>{company.name}</h3>
            </div>
            {(!shifts || selection.status == 'ready') && <h2>Closable</h2>}
            <p>{selection.target}</p>
            <p>{details.jobType}</p>
            <p>Applicants : {details.applicants}</p>
            {shifts && <Shifts shifts={shifts}/>}
        </div>
    )
};
