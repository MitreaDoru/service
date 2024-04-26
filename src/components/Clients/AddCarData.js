import { useDispatch, useSelector } from "react-redux"
import { clientAction } from "../store/clients"

const AddCardata = ({ carData }) => {
    const dispatch = useDispatch()
    const idCarForEdit = useSelector(state => state.client.idCarForEdit)
    const searchedClient = useSelector(state => state.client.searchedClient)
    const numarInmatriculare = useSelector(state => state.client.numarInmatriculare)
    const serieSasiu = useSelector(state => state.client.serieSasiu)
    const marca = useSelector(state => state.client.marca)
    const model = useSelector(state => state.client.model)
    const anulFabricatiei = useSelector(state => state.client.anulFabricatiei)
    const tipMotorizare = useSelector(state => state.client.tipMotorizare)
    const capacitateMotor = useSelector(state => state.client.capacitateMotor)
    const caiPutere = useSelector(state => state.client.caiPutere)
    const kWPutere = useSelector(state => state.client.kWPutere)
    const addCarHandler = (e) => {
        e.preventDefault()
        fetch('https://service-6ar7.onrender.com/addCar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                numarInmatriculare: numarInmatriculare,
                serieSasiu: serieSasiu,
                marca: marca,
                model: model,
                anulFabricatiei: anulFabricatiei,
                tipMotorizare: tipMotorizare,
                capacitateMotor: capacitateMotor,
                caiPutere: caiPutere,
                kWPutere: kWPutere,
                clientId: searchedClient[0].clientId,
                istoricService: []
            })
        })
            .then(result => result.json())
            .then(data => {
                if (!data.message) {
                    dispatch(clientAction.errorMessage(data.errorMessage))
                    return
                }
                dispatch(clientAction.updateClientCars(data.carAddedInfo))
                dispatch(clientAction.numarInmatriculare(''))
                dispatch(clientAction.serieSasiu(''))
                dispatch(clientAction.marca(''))
                dispatch(clientAction.model(''))
                dispatch(clientAction.anulFabricatiei(''))
                dispatch(clientAction.tipMotorizare(''))
                dispatch(clientAction.capacitateMotor(''))
                dispatch(clientAction.caiPutere(''))
                dispatch(clientAction.kWPutere(''))
                dispatch(clientAction.istoricService(''))
                dispatch(clientAction.addCar(false))
                dispatch(clientAction.editCar(false))
            })

    }
    const editCarHandler = (e) => {
        e.preventDefault()
        fetch('https://service-6ar7.onrender.com/editCar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: idCarForEdit,
                numarInmatriculare: numarInmatriculare ? numarInmatriculare : carData.numarInmatriculare,
                serieSasiu: serieSasiu ? serieSasiu : carData.serieSasiu,
                marca: marca ? marca : carData.marca,
                model: model ? model : carData.model,
                anulFabricatiei: anulFabricatiei ? anulFabricatiei : carData.anulFabricatiei,
                tipMotorizare: tipMotorizare ? tipMotorizare : carData.tipMotorizare,
                capacitateMotor: capacitateMotor ? capacitateMotor : carData.capacitateMotor,
                caiPutere: caiPutere ? caiPutere : 0,
                kWPutere: kWPutere ? kWPutere : 0,
            })
        })
            .then(result => result.json())
            .then(data => {
                if (!data.message) {
                    dispatch(clientAction.errorMessage(data.errorMessage))
                    return
                } else {
                    dispatch(clientAction.updateClientCars(data.carEditedInfo))
                    dispatch(clientAction.edit(false))
                    dispatch(clientAction.errorMessage(false))
                    dispatch(clientAction.numarInmatriculare(''))
                    dispatch(clientAction.serieSasiu(''))
                    dispatch(clientAction.marca(''))
                    dispatch(clientAction.model(''))
                    dispatch(clientAction.anulFabricatiei(''))
                    dispatch(clientAction.tipMotorizare(''))
                    dispatch(clientAction.capacitateMotor(''))
                    dispatch(clientAction.caiPutere(''))
                    dispatch(clientAction.kWPutere(''))
                    dispatch(clientAction.istoricService(''))
                    dispatch(clientAction.idCarForEdit(''))
                }
            })
    }
    const cancelHandler = () => {
        dispatch(clientAction.idCarForEdit(false))
        dispatch(clientAction.edit(false))
    }
    return (
        <div>
            <form onSubmit={idCarForEdit ? editCarHandler : addCarHandler}>
                <input onChange={(e) => dispatch(clientAction.numarInmatriculare(e.target.value))} type="text" placeholder="Numar inmatriculare" defaultValue={idCarForEdit ? carData.numarInmatriculare : ''}></input>
                <input onChange={(e) => dispatch(clientAction.serieSasiu(e.target.value))} type="text" placeholder="Serie sasiu" defaultValue={idCarForEdit ? carData.serieSasiu : ''}></input>
                <input onChange={(e) => dispatch(clientAction.marca(e.target.value))} type="text" placeholder="Marca" defaultValue={idCarForEdit ? carData.marca : ''}></input>
                <input onChange={(e) => dispatch(clientAction.model(e.target.value))} type="text" placeholder="Model" defaultValue={idCarForEdit ? carData.model : ''} ></input>
                <input onChange={(e) => dispatch(clientAction.anulFabricatiei(e.target.value))} type="number" placeholder="Anul fabricatiei" defaultValue={idCarForEdit ? carData.anulFabricatiei : ''}></input>
                <input onChange={(e) => dispatch(clientAction.tipMotorizare(e.target.value))} type="text" placeholder="Tip motorizare" defaultValue={idCarForEdit ? carData.tipMotorizare : ''}></input>
                <input onChange={(e) => dispatch(clientAction.capacitateMotor(e.target.value))} type="number" placeholder="Capacitate motor" defaultValue={idCarForEdit ? carData.capacitateMotor : ''}></input>
                <input onChange={(e) => dispatch(clientAction.caiPutere(e.target.value))} type="number" placeholder="Cai putere" defaultValue={idCarForEdit ? carData.caiPutere : ''}></input>
                <input onChange={(e) => dispatch(clientAction.kWPutere(e.target.value))} type="number" placeholder="kW putere" defaultValue={idCarForEdit ? carData.kWPutere : ''}></input>
                <button type="submit">{idCarForEdit ? "Save" : "Add car"}</button>
                <button onClick={cancelHandler}>Cancel</button>
            </form>
        </div>
    )
}

export default AddCardata