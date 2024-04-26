import { useDispatch, useSelector } from "react-redux"
import { clientAction } from "../store/clients"
import AddClientData from "./AddClientData"


const ClientData = ({ nume, prenume, telefon, email, clientId, }) => {
    const dispatch = useDispatch()
    const editClient = useSelector(state => state.client.editClient)
    const editClientHandler = (e) => {
        dispatch(clientAction.editClient(true))
        dispatch(clientAction.edit(true))
    }
    const deleteClientHandler = () => {
        fetch('https://service-6ar7.onrender.com/deleteClient', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ clientId: clientId })
        })
            .then(result => result.json())
            .then(data => {
                if (!data.message) {
                    dispatch(clientAction.errorMessage(data.errorMessage))
                    return
                } else {
                    dispatch(clientAction.searchedClient(false))
                    dispatch(clientAction.errorMessage(false))
                    dispatch(clientAction.addClient(false))
                    dispatch(clientAction.editClient(false))
                    dispatch(clientAction.searchInput(''))
                    dispatch(clientAction.nume(''))
                    dispatch(clientAction.prenume(''))
                    dispatch(clientAction.telefon(''))
                    dispatch(clientAction.email(''))
                }
            })
    }
    return (
        <div>
            <div type="text">Nume: {nume ? nume : ''} </div>
            <div type="text">Prenume: {prenume ? prenume : ''}</div>
            <div type="number">Telefon: {telefon ? telefon : ''}</div>
            <div type="text">Email: {email ? email : ''}</div>
            {editClient && <AddClientData />}
            {!editClient && <button onClick={editClientHandler}>Edit client</button>}
            {!editClient && <button onClick={deleteClientHandler}>Delete</button>}
        </div>
    )
}

export default ClientData