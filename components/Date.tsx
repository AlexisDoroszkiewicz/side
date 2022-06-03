import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import dayjs from "dayjs";

export default function Date({start, end, ...props}) {

    const [startDay, setStartDay] = useState<string>();
    const [endDay, setEndDay] = useState<string>();
    const [startHour, setStartHour] = useState<string>();
    const [endHour, setEndHour] = useState<string>();

    useEffect(()=>{
        // set dates inside useeffect because server timezone is different and creates server/client rendering differences
        // maybe use timezone arg if this goes worlwide?
        setStartDay(dayjs(start).format('DD/MM/YYYY'));
        setEndDay(dayjs(end).format('DD/MM/YYYY'));

        setStartHour(dayjs(start).format('HH:mm'));
        setEndHour(dayjs(end).format('HH:mm'));
    },[])


    return (
        <small css={css`margin-bottom: 1em;`} {...props}>
            <p css={css`font-weight: 500;`}>{startDay == endDay ? startDay : `Du ${startDay} au ${endDay}`}</p>
            <p>{startHour} <span css={css`color: var(--grey);`}>{`>`}</span> {endHour}</p>
        </small>
    )
};
