import { api } from "../../libs/api";

const useCarsService = () => {
    return {
        fetchCars: async () => {
            try {
                const response = await api.get("/automovel");
                return response.data;
            } catch (error) {
                console.log(error);
            }
        },
        createCar: async (data) => await api.post('/automovel/cadastrar', data).then((resp) => resp.data),
        deleteCar: async (carId) => await api.delete(`automovel/${carId}`).then((resp) => resp.data),
        updateCar: async (carId, data) => await api.put(`/automovel/${carId}`, data).then((resp) => resp.data),
        getCarById: async (carId) => await api.get(`/automovel/findById/${carId}`).then((resp) => resp.data),
        rentCar: async (data) => await api.post('/automovel/aluguel', data).then((resp) => resp.data),
        unleaseCar: async (data) => await api.post('/automovel/desalugar', data).then((resp) => resp.data),
    };
};

export default useCarsService;