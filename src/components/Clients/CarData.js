import { useDispatch, useSelector } from "react-redux"
import AddCardata from "./AddCarData"
import { clientAction } from "../store/clients"


const CarData = ({ clientCars }) => {
    const idCarForEdit = useSelector(state => state.client.idCarForEdit)
    const dispatch = useDispatch()

    return (
        <div>
            {clientCars.map(car =>
                <div key={car.carId}>
                    <div type="text">Numar inmatriculare: {car.numarInmatriculare} </div>
                    <div type="text">Serie sasiu: {car.serieSasiu} </div>
                    <div type="text">Marca: {car.marca}</div>
                    <div type="text">Model: {car.model}</div>
                    <div type="text">Anul fabricatie: {car.anulFabricarie}</div>
                    <div type="text">Tip motorizare: {car.tipMotorizare}</div>
                    <div type="text">Capacitate motor: {car.capacitateMotor}</div>
                    <div type="text">Cai putere: {car.caiPutere}</div>
                    <div type="text">kW putere: {car.kWPutere}</div>
                    <div type="text">Istoric service: {car.istoricService ? car.istoricService.map(data =>
                        <div key={car.carId}>
                            <div>{data.actiuni}</div>
                            <div>{data.primire}</div>
                            <div>{data.procesare}</div>
                            <div>{data.durata}</div>
                        </div>
                    ) : ''}</div>
                    {(idCarForEdit === car.carId) && <AddCardata carData={car} />}
                    {(idCarForEdit !== car.carId) && <button onClick={() => {
                        dispatch(clientAction.idCarForEdit(car.carId))
                        dispatch(clientAction.edit(true))
                    }}>Edit car</button>}
                    {(idCarForEdit !== car.carId) && <button onClick={() => {
                        fetch('https://service-6ar7.onrender.com/deleteCar', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ id: car.carId })
                        })
                            .then(result => result.json())
                            .then(data => {
                                if (!data.message) {
                                    dispatch(clientAction.errorMessage(data.errorMessage))
                                    return
                                } else {
                                    dispatch(clientAction.deleteClientCar(car.carId))
                                }
                            })
                    }}>Delete</button>}
                </div>
            )}
        </div>
    )
}

export default CarData