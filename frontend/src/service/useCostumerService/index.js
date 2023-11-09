import { api } from "../../libs/api";


const useCostumerService = () => {
    return {
        fetchCostumers: async () => {
            try {
                const response = await api.get("/cliente");
                return response.data;
            } catch (error) {
                console.log(error);
            }
        },
        createCostumer: async (data) => await api.post('/cliente/cadastrar', data).then((resp) => resp.data),
        deleteCostumer: async (costumerId) => await api.delete(`/cliente/${costumerId}`).then((resp) => resp.data),
        updateCostumer: async (costumerId, data) => await api.put(`/cliente/${costumerId}`, data).then((resp) => resp.data),
    };
};

export default useCostumerService;