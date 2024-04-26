import { useDispatch, useSelector } from "react-redux"
import { clientAction } from "../store/clients"

const AddClientData = () => {
    const dispatch = useDispatch()
    const editClient = useSelector(state => state.client.editClient)
    const searchedClient = useSelector(state => state.client.searchedClient)
    const nume = useSelector(state => state.client.nume)
    const prenume = useSelector(state => state.client.prenume)
    const telefon = useSelector(state => state.client.telefon)
    const email = useSelector(state => state.client.email)
    const addClientHandler = (e) => {
        e.preventDefault()
        fetch('https://service-6ar7.onrender.com/addClient', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nume: nume, prenume: prenume, telefon: telefon, email: email })
        })
            .then(result => result.json())
            .then(data => {
                if (!data.message) {
                    dispatch(clientAction.errorMessage(data.errorMessage))
                    return
                }
                dispatch(clientAction.searchedClient([{ nume: nume, prenume: prenume, telefon: telefon, email: email, clientId: data.clientId }]))
                dispatch(clientAction.errorMessage(false))
                dispatch(clientAction.addClient(false))
                dispatch(clientAction.editClient(false))
                dispatch(clientAction.nume(''))
                dispatch(clientAction.prenume(''))
                dispatch(clientAction.telefon(''))
                dispatch(clientAction.email(''))
            })
    }

    const editClientHandler = (e) => {
        e.preventDefault()
        fetch('https://service-6ar7.onrender.com/editClient', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nume: nume ? nume : searchedClient[0].nume, prenume: prenume ? prenume : searchedClient[0].prenume, telefon: telefon ? telefon : searchedClient[0].telefon, email: email ? email : searchedClient[0].email, id: searchedClient[0].clientId })
        })
            .then(result => result.json())
            .then(data => {
                if (!data.message) {
                    dispatch(clientAction.errorMessage(data.errorMessage))
                    return
                } else {
                    dispatch(clientAction.searchedClient([{ nume: data.editedClientInfo.nume, prenume: data.editedClientInfo.prenume, telefon: data.editedClientInfo.telefon, email: data.editedClientInfo.email, clientId: data.editedClientInfo.id }]))
                    dispatch(clientAction.edit(false))
                    dispatch(clientAction.errorMessage(false))
                    dispatch(clientAction.addClient(false))
                    dispatch(clientAction.editClient(false))
                    dispatch(clientAction.nume(''))
                    dispatch(clientAction.prenume(''))
                    dispatch(clientAction.telefon(''))
                    dispatch(clientAction.email(''))
                }
            })
    }
    const cancelHandler = () => {
        dispatch(clientAction.editClient(false))
        dispatch(clientAction.addClient(false))
        dispatch(clientAction.edit(false))
    }
    return (
        <div>
            <form onSubmit={editClient ? editClientHandler : addClientHandler}>
                <input onChange={(e) => dispatch(clientAction.nume(e.target.value))} type="text" placeholder="Nume" defaultValue={editClient ? searchedClient[0].nume : ''}></input>
                <input onChange={(e) => dispatch(clientAction.prenume(e.target.value))} type="text" placeholder="Prenume" defaultValue={editClient ? searchedClient[0].prenume : ''}></input>
                <input onChange={(e) => dispatch(clientAction.telefon(e.target.value))} type="text" placeholder="Telefon" defaultValue={editClient ? searchedClient[0].telefon : ''}></input>
                <input onChange={(e) => dispatch(clientAction.email(e.target.value))} type="text" placeholder="Email" defaultValue={editClient ? searchedClient[0].email : ''}></input>
                <button type="submit">{editClient ? "Save" : "Add client"}</button>
                <button onClick={cancelHandler}>Cancel</button>
            </form>
        </div>
    )
}

export default AddClientData