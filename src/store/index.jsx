import { configureStore } from "@reduxjs/toolkit";
import themeConfigSlice from "./reducers/ThemeConfigSlice";

const store = configureStore({
    reducer: {
        theme: themeConfigSlice
    }
})

export default store;