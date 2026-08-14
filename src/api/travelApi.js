import apiClient from "./apiClient.js";

export const getTravels = async ({
    idDep,
    idDes,
    date
}) => {
    
    const response = await apiClient.get(`/mR1pksI0r/online/trips/search/${idDep}_${idDes}_${date}?passenger=1`);

    return response.data;
};