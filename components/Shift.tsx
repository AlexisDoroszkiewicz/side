import { useContext, useEffect, useState } from "react";
import { Context } from "./Task";
import { css } from "@emotion/react";
import dayjs from "dayjs";
import FilledSlots from "@components/FilledSlots";
import Date from "@components/Date"

export default function Shift ({shift, index, length, ...props}) {

    // SHOULD REFACTO THIS -> Lift state up, handle state via TASK as an array
    const [setFailing, setShort, expectedTempWorker, expectedTempState, setExpectedTempState] = useContext(Context);
    const ended = dayjs() > dayjs(shift.end);
    const filled = (shift.slots == shift.filledSlots);
    const [localFailing, setLocalFailing] = useState(false);
    const [localShort, setLocalShort] = useState(false);
    const [localClosable, setLocalClosable] = useState(false);

    useEffect(() => {
        // if not ended, update temp worker count
        if (!ended) expectedTempWorker.current += (shift.slots - shift.filledSlots);
        // if shift began, is not ended, and slots not filled set failing to true
        if (!ended && (dayjs() > dayjs(shift.start)) && (shift.filledSlots < shift.slots)) {
            setFailing(true);
            setLocalFailing(true);
        }
        // else if shift begins within 24h, set short to true
        else if (dayjs(shift.start).diff(dayjs(), 'hour') < 24 &&  dayjs(shift.start).diff(dayjs(), 'hour') > 0) {
            setShort(true);
            setLocalShort(true);
        }
        // if at the last shift and expectedState unset, update state for count; counts double in development due to react18 behaviour, counting properly on the deployed version
        if (index == length -1 && expectedTempState == 0) setExpectedTempState(expectedTempWorker.current);        
    }, [])

    return (
        <div css={shiftContainer(ended, localFailing, localShort, filled)} {...props}>
            <Date start={shift.start} end={shift.end}/>
            <FilledSlots filledSlots={shift.filledSlots} slots={shift.slots}/>
        </div>
    )
}

const shiftContainer = (ended: boolean, localFailing:boolean, localShort:boolean, filled: boolean) =>css`
    opacity: ${ended && 0.4};
    background-color: ${filled ? "var(--greenLight)" :localFailing ? "var(--redLight)" : localShort && "var(--yellowLight)"};
    border: 1px solid black;
    padding: 1em;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
`
