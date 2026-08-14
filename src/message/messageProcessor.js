import { buildTravelMessage } from "./travelMessageBuilder.js";
import { buildPriceMessage } from "./priceMessageBuilder.js";
import { translations } from "./messageTranslation.js";


const messageBuilders = {

    mg: {
        travel_search: buildTravelMessage,
        price_request: buildPriceMessage
    },

    fr: {
        travel_search: buildTravelMessage,
        price_request: buildPriceMessage
    }
};


export const processMessage = async ( responsePrediction, userId ) => {

    const language = responsePrediction?.language?.values;
    const intention = responsePrediction?.intention;
    const traits = responsePrediction?.traits?.id;
    const builder = messageBuilders[language]?.[intention];


    if (!builder) {

        const unknownMessage = translations[language]?.unknown;
        const greeting =
            traits === 1
                ? translations[language]?.greeting ||
                  translations.fr.greeting
                : "";

        return greeting + unknownMessage;
    }

    return await builder(
        responsePrediction,
        traits,
        userId,
        language
    );
};