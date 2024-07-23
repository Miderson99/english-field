import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    isSidebarActive: false,


}

const themeConfigSlice = createSlice({
    name: "themeConfig",
    initialState: initialState,
    reducers: {

        troggleSidebar: (state, {payload}) => {
            state.isSidebarActive = !payload;
        }

    }

})


export const {troggleSidebar} = themeConfigSlice.actions;

export default themeConfigSlice.reducer;