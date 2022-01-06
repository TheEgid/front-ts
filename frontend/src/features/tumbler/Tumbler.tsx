import { useDispatch, useSelector } from "react-redux";
import { changeRowQuantity, selectRowQuantity } from "./tumblerSlice";
import React, { FC } from "react";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";

const Tumbler: FC = () => {
    const tumblerRowAmount = useSelector(selectRowQuantity);
    const dispatch = useDispatch();

    const handleChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch(changeRowQuantity(e.currentTarget.value));
    };

    return (
        <FormControl sx={{ marginLeft: "auto" }} component="fieldset">
            <FormLabel component="legend">Выбор</FormLabel>
            <RadioGroup
                aria-label="rows"
                defaultValue="30"
                name="radio-buttons-group"
                value={tumblerRowAmount}
                onChange={handleChangeGender}>
                <FormControlLabel
                    value="30"
                    control={<Radio />}
                    checked={tumblerRowAmount === "30"}
                    label="количество строк: 30"
                />
                <FormControlLabel
                    value="70"
                    control={<Radio />}
                    checked={tumblerRowAmount === "70"}
                    label="количество строк: 70"
                />
                <FormControlLabel
                    value="100"
                    control={<Radio />}
                    checked={tumblerRowAmount === "100"}
                    label="количество строк: 100"
                />
            </RadioGroup>
        </FormControl>
    );
};

export default Tumbler;
