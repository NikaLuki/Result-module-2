import httpService from "./http.service";

const qualitiesEndponit = "quality/";

const qualitiesService = {
    get: async () => {
        const { data } = await httpService.get(qualitiesEndponit);
        return data;
    }
};

export default qualitiesService;
