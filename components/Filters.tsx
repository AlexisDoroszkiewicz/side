import Slider from "@components/Slider";
import Select from "@components/Select";
import DatePicker from "@components/DatePicker";

export default function Filters(params) {
    return (
        <div>
            <Select/>
            <DatePicker/>
            <Slider/>
        </div>
    )
};
