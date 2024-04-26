import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nume: '',
    prenume: '',
    telefon: '',
    email: '',
    numarInmatriculare: '',
    serieSasiu: '',
    marca: '',
    model: '',
    anulFabricatiei: '',
    tipMotorizare: '',
    capacitateMotor: '',
    caiPutere: '',
    kWPutere: '',
    istoricService: '',
    addClient: false,
    editClient: false,
    addCar: false,
    editCar: false,
    errorMessage: false,
    clientsData: [],
    carsData: [],
    clientCars: [],
    searchedClient: false,
    idCarForEdit: "",
    searchInput: "",
    edit: false

}

const clientSlice = createSlice({
    name: 'client',
    initialState: initialState,
    reducers: {
        nume(state, action) {
            state.nume = action.payload;
        },
        prenume(state, action) {
            state.prenume = action.payload;
        },
        telefon(state, action) {
            state.telefon = action.payload;
        },
        email(state, action) {
            state.email = action.payload;
        },
        numarInmatriculare(state, action) {
            state.numarInmatriculare = action.payload;
        },
        serieSasiu(state, action) {
            state.serieSasiu = action.payload;
        },
        marca(state, action) {
            state.marca = action.payload;
        },
        model(state, action) {
            state.model = action.payload;
        },
        anulFabricatiei(state, action) {
            state.anulFabricatiei = action.payload;
        },
        tipMotorizare(state, action) {
            state.tipMotorizare = action.payload;
        },
        capacitateMotor(state, action) {
            state.capacitateMotor = action.payload;
        },
        caiPutere(state, action) {
            state.caiPutere = action.payload;
        },
        kWPutere(state, action) {
            state.kWPutere = action.payload;
        },
        istoricService(state, action) {
            state.istoricService = action.payload;
        },
        addClient(state, action) {
            state.addClient = action.payload;
        },
        editClient(state, action) {
            state.editClient = action.payload;
        },
        addCar(state, action) {
            state.addCar = action.payload;
        },
        editCar(state, action) {
            state.editCar = action.payload;
        },
        errorMessage(state, action) {
            state.errorMessage = action.payload;
        },
        clientsData(state, action) {
            console.log(action.payload);
            state.clientsData = action.payload;
        },
        clientCars(state, action) {
            state.clientCars = action.payload;
        },
        carsData(state, action) {
            state.carsData = action.payload;
        },
        searchedClient(state, action) {
            state.searchedClient = action.payload;
        },
        idCarForEdit(state, action) {
            state.idCarForEdit = action.payload
        },
        updateClientCars(state, action) {
            const indexCarEdited = state.clientCars.findIndex(car => car.carId === action.payload.carId)
            if (indexCarEdited === -1) {
                state.clientCars.unshift(action.payload)
            } else {
                state.clientCars[(state.clientCars.length !== 0) ? indexCarEdited : 0] = action.payload
            }
        },
        searchInput(state, action) {
            state.searchInput = action.payload
        },
        deleteClientCar(state, action) {
            state.clientCars = state.clientCars.filter(car => car.carId !== action.payload)
        },
        edit(state, action) {
            state.edit = action.payload
        }



    }
})

export const clientAction = clientSlice.actions;
export default clientSlice.reducer 