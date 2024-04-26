import { configureStore } from "@reduxjs/toolkit";


import clientReducer from "./clients";
import appointmentReducer from "./appointments";

const store = configureStore({
    reducer: { client: clientReducer, appointments: appointmentReducer },
});

export default store;