import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { DefaultRootState } from "react-redux";

type TRowsQty = "30" | "70" | "100";

export interface IRowsQty {
    rowsQty: TRowsQty;
}

const initState: IRowsQty = {
    rowsQty: "30",
};

export const tumblerSlice = createSlice({
    name: "tumblerReduser",
    initialState: initState,
    reducers: {
        changeRowQuantity: (state, action: PayloadAction<any>) => {
            state.rowsQty = action.payload as unknown as TRowsQty;
        },
    },
});

export const { changeRowQuantity } = tumblerSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export const selectRowQuantity = (state) => state.tumblerReduser.rowsQty as string;
