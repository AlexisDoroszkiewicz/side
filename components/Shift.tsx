import { css } from "@emotion/react";
import FilledSlots from "@components/FilledSlots";
import Date from "@components/Date"

export default function Shift ({shift, index, ...props}) {

    console.log(shift.state)
    const ended = shift.state.ended;
    const failing = shift.state.failing;
    const short = shift.state.short;
    const filled = (shift.slots == shift.filledSlots);

    return (
        <div css={shiftContainer(ended, failing, short, filled)} {...props}>
            <Date start={shift.start} end={shift.end}/>
            <FilledSlots filledSlots={shift.filledSlots} slots={shift.slots}/>
        </div>
    )
}

const shiftContainer = (ended: boolean, failing:boolean, short:boolean, filled: boolean) =>css`
    opacity: ${ended && 0.4};
    background-color: ${filled ? "var(--greenLight)" : failing ? "var(--redLight)" : short && "var(--yellowLight)"};
    border: 1px solid ${filled ? "var(--green)" : failing ? "var(--red)" : short ? "var(--orange)" : 'var(--grey)'};;
    padding: 1em;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
`
