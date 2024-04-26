// import styled from './AppointmentsData.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { appointmentAction } from '../store/appointments'
import { clientAction } from '../store/clients'

const AppointmentsData = () => {
    const appointmentsData = useSelector(state => state.appointments.appointmentsData)
    const dispatch = useDispatch()
    return (
        <div>
            {appointmentsData.map(appointment => (
                <div key={appointment.id}>
                    <div>Contact: {appointment.contact}</div>
                    <div>Masina: {appointment.masina}</div>
                    <div>Actiuni asupra masinii: {appointment.actiuni}</div>
                    <div>Timp programare: {appointment.timpProgramare}</div>
                    <div>Primire masina: {appointment.primire}</div>
                    <div>Procesare masina: {appointment.procesare}</div>
                    <div>Durata procesului: {appointment.durata}</div>
                    <button onClick={() => {
                        dispatch(appointmentAction.idAppointmentForEdit(appointment.id));
                        dispatch(appointmentAction.contact(appointment.contact))
                        dispatch(appointmentAction.masina(appointment.masina))
                        dispatch(appointmentAction.actiuni(appointment.actiuni))
                        dispatch(appointmentAction.timpProgramare(appointment.timpProgramare))
                        dispatch(appointmentAction.primire(appointment.primire))
                        dispatch(appointmentAction.procesare(appointment.procesare))
                        dispatch(appointmentAction.durata(appointment.durata))
                        dispatch(appointmentAction.editAppointmentData({ contact: appointment.contact, masina: appointment.masina, actiuni: appointment.actiuni, timpProgramare: appointment.timpProgramare, primire: appointment.primire, procesare: appointment.procesare, durata: appointment.durata }))
                    }}>Edit</button>
                    <button onClick={() => {
                        fetch('https://service-6ar7.onrender.com/deleteAppointment', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ id: appointment.id })
                        })
                            .then(result => result.json())
                            .then(data => {
                                if (!data.message) {
                                    dispatch(clientAction.errorMessage(data.errorMessage))
                                    return
                                } else {
                                    dispatch(appointmentAction.deleteAppointment(appointment.id))
                                }
                            })
                    }

                    }>Delete</button>
                    <button onClick={() => {
                        fetch('https://service-6ar7.onrender.com/addToCarHistory', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ id: appointment.id, masina: appointment.masina, actiuni: appointment.actiuni, primire: appointment.primire, procesare: appointment.procesare, durate: appointment.durata })
                        })
                            .then(result => result.json())
                            .then(data => {
                                if (!data.message) {
                                    dispatch(clientAction.errorMessage(data.errorMessage))
                                    return
                                } else {
                                    dispatch(appointmentAction.deleteAppointment(appointment.id))
                                }
                            })
                    }}>Complete</button>
                </div>
            ))}
        </div>
    )
}

export default AppointmentsData