import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contact: '',
    timpProgramare: '',
    masina: '',
    actiuni: '',
    primire: '',
    procesare: '',
    durata: '',
    appointmentsData: [],
    idAppointmentForEdit: '',
    editAppointmentData: []
}

const appointmentSlice = createSlice({
    name: 'client',
    initialState: initialState,
    reducers: {
        contact(state, action) {
            state.contact = action.payload
        },
        timpProgramare(state, action) {
            state.timpProgramare = action.payload
        },
        masina(state, action) {
            state.masina = action.payload
        },
        actiuni(state, action) {
            state.actiuni = action.payload
        },
        primire(state, action) {
            state.primire = action.payload
        },
        procesare(state, action) {
            state.procesare = action.payload
        },
        durata(state, action) {
            state.durata = action.payload
        },
        appointmentsData(state, action) {
            state.appointmentsData = action.payload
        },
        appointmentsUpdate(state, action) {
            if (state.appointmentsData.length === 0) {
                state.appointmentsData[0] = action.payload
            } else {
                state.appointmentsData.unshift(action.payload)
            }
        },
        idAppointmentForEdit(state, action) {
            state.idAppointmentForEdit = action.payload
        },
        editAppointmentData(state, action) {
            state.editAppointmentData = action.payload
        },
        appointmentsEditUpdate(state, action) {
            const index = state.appointmentsData.findIndex(appointment => appointment.id === action.payload.id)
            state.appointmentsData[index] = action.payload
        },
        deleteAppointment(state, action) {
            const index = state.appointmentsData.findIndex(appointment => appointment.id === action.payload)
            state.appointmentsData.splice(index, 1)
        }



    }
})

export const appointmentAction = appointmentSlice.actions;
export default appointmentSlice.reducer 