import { css } from "@emotion/react";
import Slider from "@components/Slider";
import DropDown from "@components/DropDown";
import DatePicker from "@components/DatePicker";

export default function Filters(params) {
    return (
        <div css={css`display: flex; gap: 1rem; padding: 1rem; position: sticky; top:0; background-color: white;`}>
            <DropDown/>
            <DatePicker/>
            <Slider/>
        </div>
    )
};
