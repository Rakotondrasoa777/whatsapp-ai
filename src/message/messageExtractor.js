export const extractTravelData = (prediction) => {

    return {
        idDep: prediction.entities?.location?.departure?.id,
        idDes: prediction.entities?.location?.destination?.id,

        departure: prediction.entities?.location?.departure?.body,

        destination: prediction.entities?.location?.destination?.body,

        date: prediction.entities?.datetime?.values,

        bustype: prediction.entities?.bustype?.body
    };
};