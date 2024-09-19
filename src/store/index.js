import { configureStore } from "@reduxjs/toolkit";
import servicesSlice from "./features/services/services.slice";
import barberSlice from "./features/barber/barber.slice";
import authSlice from "./features/auth/auth.slice";
import appointmentSlice from "./features/appointments/appointment.slice";
import slotsSlice from "./features/slots/slots.slice";
import newsletterSlice from "./features/newsletter/newsletterSlice";


const store = configureStore({
    reducer: {
        barber: barberSlice,
        service: servicesSlice,
        auth: authSlice,
        appointments: appointmentSlice,
        slots: slotsSlice,
        newsletter:newsletterSlice 
    },
});

export default store;
