import { setConversation } from "../conversation/conversationState.js";
import { extractTravelData } from "./messageExtractor.js";
import { translations } from "./messageTranslation.js";


const isSameLocation = (departure, destination) => {

    return (
        departure?.trim().toLowerCase() ===
        destination?.trim().toLowerCase()
    );
};


export const buildTravelMessage = (
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

    if (!departure || !destination || !date) {

        return (
            greetings +
            translatedMessages.travel.missingData
        );
    }

    if (isSameLocation(departure, destination)) {

        return (
            greetings +
            translatedMessages.travel.sameLocation
        );
    }

    setConversation(userId, {
        intention: prediction?.intention,
        language:prediction?.language?.values,
        idDep,
        idDes,
        date,
        bustype
    });

    return `${greetings}${translatedMessages.request}

* ${translatedMessages.travel.title} *
_________________________

📍 ${translatedMessages.travel.departure} : ${departure}
🎯 ${translatedMessages.travel.destination} : ${destination}
📅 ${translatedMessages.travel.date} : ${date}
🎟️ Bus : ${bustype}

_________________________

${translatedMessages.travel.confirm}
${translatedMessages.travel.cancel}`;
};