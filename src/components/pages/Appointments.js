import { useEffect } from 'react'
import AppointmentsContent from '../Appointments/AppointmentsContent'
import { appointmentAction } from '../store/appointments'
import { useDispatch } from 'react-redux'

const Appointments = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        fetch('https://service-6ar7.onrender.com/appointments', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(result => result.json())
            .then(data => {
                dispatch(appointmentAction.appointmentsData(data.appointments))

            })
    })
    return (
        <div>
            <AppointmentsContent />
        </div>
    )
}

export default Appointments