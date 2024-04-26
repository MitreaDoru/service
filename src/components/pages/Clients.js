import { useEffect } from "react"
import ClientsContent from "../Clients/ClientsContent"
import { useDispatch } from "react-redux"
import { clientAction } from "../store/clients"

const Clients = () => {
    const dispatch = useDispatch()
    dispatch(clientAction.searchedClient(false))
    dispatch(clientAction.clientCars([]))
    dispatch(clientAction.searchInput(''))
    useEffect(() => {
        fetch('https://service-6ar7.onrender.com/clients', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(result => result.json())
            .then(data => {
                dispatch(clientAction.clientsData(data.clients))
                dispatch(clientAction.carsData(data.cars))
                dispatch(clientAction.errorMessage(false))

            })
    })
    return (
        <div>
            <ClientsContent />
        </div>
    )
}

export default Clients