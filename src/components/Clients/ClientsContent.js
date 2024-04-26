import { useDispatch, useSelector } from "react-redux"
import AddCardata from "./AddCarData"
import AddClientData from "./AddClientData"
import CarData from "./CarData"
import ClientData from "./ClientData"
import { clientAction } from "../store/clients"


const ClientsContent = () => {
    const addClient = useSelector(state => state.client.addClient)
    const addCar = useSelector(state => state.client.addCar)
    const clientsData = useSelector(state => state.client.clientsData)
    const clientCars = useSelector(state => state.client.clientCars)
    const carsData = useSelector(state => state.client.carsData)
    const searchedClient = useSelector(state => state.client.searchedClient)
    const errorMessage = useSelector(state => state.client.errorMessage)
    const searchInput = useSelector(state => state.client.searchInput)
    const edit = useSelector(state => state.client.edit)
    const dispatch = useDispatch()
    const addClientHandler = () => {
        dispatch(clientAction.addClient(true))
        dispatch(clientAction.searchedClient(false))
        dispatch(clientAction.searchInput(''))
        dispatch(clientAction.clientCars([]))
    }
    const addCarHandler = () => {
        dispatch(clientAction.addCar(true))
    }
    const findClientHandler = (e) => {
        e.preventDefault()

        let cars = []
        let clients = []

        clientsData.forEach(client => {
            if (client.telefon.includes(searchInput) && searchInput.length >= 10) {
                clients.push(client)

                carsData.forEach(car => {
                    if (car.clientId === client.clientId) {
                        cars.push(car)
                    }
                })

            } else if (searchInput === "") {
                dispatch(clientAction.searchedClient(false))
                dispatch(clientAction.clientCars([]))
            }
        })
        dispatch(clientAction.searchedClient(clients))
        dispatch(clientAction.clientCars(cars))
    }

    return (
        <div>
            <form onSubmit={findClientHandler}>
                <input onChange={(e) => {
                    dispatch(clientAction.addClient(false))
                    dispatch(clientAction.addCar(false))
                    dispatch(clientAction.searchInput(e.target.value))
                    if (e.target.value === '') {
                        dispatch(clientAction.searchedClient(false))
                        dispatch(clientAction.clientCars([]))
                    }
                }
                } type="text" placeholder="Search client" value={searchInput}></input>
                <button type="submit">Search</button>
            </form>
            {!edit && <button onClick={addClientHandler}>New Client</button>}
            {(searchedClient && !edit) && <button onClick={addCarHandler}>New Car</button>}
            {addClient && <AddClientData />}
            {errorMessage && <div>{errorMessage}</div>}
            {(searchedClient.length === 1) && <ClientData nume={searchedClient[0].nume} prenume={searchedClient[0].prenume} telefon={searchedClient[0].telefon} email={searchedClient[0].email} clientId={searchedClient[0].clientId} />}
            {addCar && <AddCardata />}
            {searchedClient && <CarData clientCars={clientCars} />}
        </div>
    )
}

export default ClientsContent