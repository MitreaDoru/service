// import styled from './AppointmentsContent.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { appointmentAction } from '../store/appointments'
import { clientAction } from '../store/clients'
import AppointmentsData from './AppointmentsData'

const AppointmentsContent = () => {
    const dispatch = useDispatch()
    const contact = useSelector(state => state.appointments.contact)
    const masina = useSelector(state => state.appointments.masina)
    const actiuni = useSelector(state => state.appointments.actiuni)
    const timpProgramare = useSelector(state => state.appointments.timpProgramare)
    const primire = useSelector(state => state.appointments.primire)
    const procesare = useSelector(state => state.appointments.procesare)
    const durata = useSelector(state => state.appointments.durata)
    const idAppointmentForEdit = useSelector(state => state.appointments.idAppointmentForEdit)
    const errorMessage = useSelector(state => state.client.errorMessage)

    const appointmentHandler = (e) => {
        e.preventDefault()
        fetch('https://service-6ar7.onrender.com/addAppointment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ contact, masina, actiuni, timpProgramare, primire, procesare, durata })
        })
            .then(result => result.json())
            .then(data => {
                if (!data.message) {
                    dispatch(clientAction.errorMessage(data.errorMessage))
                    return
                } else {
                    dispatch(appointmentAction.appointmentsUpdate(data.appointment))
                    dispatch(appointmentAction.contact(''))
                    dispatch(appointmentAction.masina(''))
                    dispatch(appointmentAction.actiuni(''))
                    dispatch(appointmentAction.timpProgramare(''))
                    dispatch(appointmentAction.primire(''))
                    dispatch(appointmentAction.procesare(''))
                    dispatch(appointmentAction.durata(''))
                }
            })
    }
    const editAppointmentHandler = (e) => {
        e.preventDefault()
        fetch('https://service-6ar7.onrender.com/editAppointment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ contact, masina, actiuni, timpProgramare, primire, procesare, durata, id: idAppointmentForEdit })
        })
            .then(result => result.json())
            .then(data => {
                if (!data.message) {
                    dispatch(clientAction.errorMessage(data.errorMessage))
                    return
                } else {
                    console.log('he');
                    dispatch(appointmentAction.appointmentsEditUpdate(data.editedAppointmentInfo))
                    dispatch(appointmentAction.idAppointmentForEdit(false))
                    dispatch(appointmentAction.contact(''))
                    dispatch(appointmentAction.masina(''))
                    dispatch(appointmentAction.actiuni(''))
                    dispatch(appointmentAction.timpProgramare(''))
                    dispatch(appointmentAction.primire(''))
                    dispatch(appointmentAction.procesare(''))
                    dispatch(appointmentAction.durata(''))
                }
            })
    }
    return (
        <div>
            <form onSubmit={idAppointmentForEdit ? editAppointmentHandler : appointmentHandler}>
                <div>{errorMessage}</div>
                <input type='text' onChange={(e) => dispatch(appointmentAction.contact(e.target.value))} placeholder='Contact' value={contact}></input>
                <input type='text' onChange={(e) => dispatch(appointmentAction.masina(e.target.value))} placeholder='Masina' value={masina}></input>
                <input type='text' onChange={(e) => dispatch(appointmentAction.actiuni(e.target.value))} placeholder='Actiune asupra masinii' value={actiuni}></input>
                <input type='text' onChange={(e) => dispatch(appointmentAction.primire(e.target.value))} placeholder='Primire masina' value={primire}></input>
                <input type='text' onChange={(e) => dispatch(appointmentAction.procesare(e.target.value))} placeholder='Procesare masina' value={procesare}></input>
                <input type='number' step={10} onChange={(e) => dispatch(appointmentAction.durata(e.target.value))} placeholder='Durata procesului' value={durata}></input>
                <input type='time' min="08:00" max="17:00" step="1800" onChange={(e) => dispatch(appointmentAction.timpProgramare(e.target.value))} placeholder='Interval de timp' value={timpProgramare}></input>
                <button type='submit'>Save</button>
            </form >
            <AppointmentsData />
        </div>
    )

}

export default AppointmentsContent