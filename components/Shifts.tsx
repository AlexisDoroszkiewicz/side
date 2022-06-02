import dayjs from "dayjs"
import { css } from "@emotion/react";
import { useContext, useLayoutEffect } from "react";
import { FailingContext } from "./Task";

export default function Shifts({shifts, failingState, ...props}) {
    return (
        <div css={container}>
            {shifts.map(shift => <Shift key={shift.id} shift={shift}/>)}
        </div>
    )
};

const container = css`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`

const Shift = ({shift, ...props}) => {
    const [failing, setFailing] = useContext(FailingContext);

    useLayoutEffect(() => {
        // if shift date began, and slots not filled set failing to true
        if ((dayjs() > dayjs(shift.start)) && (shift.filledSlots < shift.slots)) setFailing(true);
    }, [])

    const start = dayjs(shift.start).format('DD/MM/YYYY HH:mm');
    const end = dayjs(shift.end).format('DD/MM/YYYY HH:mm');

    return (
        <div css={shiftContainer} {...props}>
            <small>
                <p>Du {start}</p>
                <p>Au {end}</p>
            </small>
            <small>
                <p>Slots {shift.filledSlots}/{shift.slots} {shift.slots == shift.filledSlots ? "✅" : "❌"}</p>
            </small>
        </div>
    )
}

const shiftContainer = css`
    border: 1px solid black;
    width: fit-content;
    padding: 1em;
`