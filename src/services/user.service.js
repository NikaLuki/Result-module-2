import httpService from "./http.service";

const userEndponit = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndponit);
        return data;
    }
};

export default userService;
