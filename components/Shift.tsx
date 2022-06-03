import { css } from "@emotion/react";
import dayjs from "dayjs";
import FilledSlots from "@components/FilledSlots";
import Date from "@components/Date"

export default function Shift ({shift, index, length, ...props}) {

    const ended = dayjs() > dayjs(shift.end);
    const filled = (shift.slots == shift.filledSlots);

    return (
        <div {...props}>
            <Date start={shift.start} end={shift.end}/>
            <FilledSlots filledSlots={shift.filledSlots} slots={shift.slots}/>
        </div>
    )
}

const shiftContainer = (ended: boolean, localFailing:boolean, localShort:boolean, filled: boolean) =>css`
    opacity: ${ended && 0.4};
    background-color: ${filled ? "var(--greenLight)" :localFailing ? "var(--redLight)" : localShort && "var(--yellowLight)"};
    border: 1px solid ${filled ? "var(--green)" :localFailing ? "var(--red)" : localShort ? "var(--orange)" : 'var(--grey)'};;
    padding: 1em;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
`
