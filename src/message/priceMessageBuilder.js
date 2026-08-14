import { setConversation } from "../conversation/conversationState.js";
import { extractTravelData } from "./messageExtractor.js";
import { translations } from "./messageTranslation.js";


const isSameLocation = (departure, destination) => {

    return (
        departure?.trim().toLowerCase() ===
        destination?.trim().toLowerCase()
    );
};


export const buildPriceMessage = (
    prediction,
    traits,
    userId,
    language
) => {

    const translatedMessages = translations[language];

    const {
        idDep,
        idDes,
        departure,
        destination,
        date,
        bustype
    } = extractTravelData(prediction);


    const greetings = traits === 1
        ? translatedMessages.greeting
        : "";

    if (!departure || !destination) {

        return (
            greetings +
            translatedMessages.price.missingData
        );
    }

    if (isSameLocation(departure, destination)) {

        return (
            greetings +
            translatedMessages.price.sameLocation
        );
    }

    if (!bustype) {

        return (
            greetings +
            translatedMessages.price.missingBus
        );
    }

    setConversation(userId, {
        intention: prediction?.intention,
        language:prediction?.language?.values,
        idDep,
        idDes,
        date,
        bustype,
        departure,
        destination
    });

    return `${greetings}${translatedMessages.request}

* ${translatedMessages.price.title} *
_________________________

📍 ${translatedMessages.price.departure} : ${departure}
🎯 ${translatedMessages.price.destination} : ${destination}
📅 ${translatedMessages.price.date} : ${date}
🎟️ Bus : ${bustype}

_________________________

${translatedMessages.price.confirm}
${translatedMessages.price.cancel}`;
};