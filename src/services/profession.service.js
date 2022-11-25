import httpService from "./http.service";

const professionEndponit = "profession/";

const professionService = {
    get: async () => {
        const { data } = await httpService.get(professionEndponit);
        return data;
    }
};

export default professionService;
