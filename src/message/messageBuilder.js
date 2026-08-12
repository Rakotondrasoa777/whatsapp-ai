import { setConversation } from "../conversation/conversationState.js";

const buildMalagasyMessage = {

    travel_search: (prediction, traits, userId) => {

        let greetings = ""

        if (traits === 1) {
            greetings = "Salama tompoko! 👋\n\n"
        }

        const departure =
            prediction.entities?.location?.departure?.body;

        const destination =
            prediction.entities?.location?.destination?.body;

        const date =
            prediction.entities?.datetime?.values;

        if (!departure || !destination || !date) {
            return `${greetings}Ra hitady voyage ianao dia mila marihanao ny toerana iaingana sy ny toerana halehana.

Azafady, avereno amin'ny fomba mazava kokoa ny fangatahanao. 🙏`;
        }
        
        setConversation(userId, {
            intention: prediction?.intention,
            language: prediction?.language.values,
            departure,
            destination,
            date
        })

        return `${greetings}Ity ny fangatahanao: 
        
* FIKAROHANA ZOTRA 🧭 *
_________________________

📍 Toerana iaingana : ${departure}
🎯 Toerana halehana : ${destination}
📅 Daty : ${date}

_________________________

Valio (1) raha tadiavina ilay zotra.
Valio (2) raha misy diso ka averina ny fangatahina`;
    },


    price_request: (prediction, traits, userId) => {

        let greetings = ""

        if (traits === 1) {
            greetings = "Salama tompoko! 👋\n\n"
        }

        const departure =
            prediction.entities?.location?.departure?.body;

        const destination =
            prediction.entities?.location?.destination?.body;

        const date =
            prediction.entities?.datetime?.values;

        if (!departure || !destination || !date) {
            return `${greetings}Ra te hafantatra ny vidin-dalana ianao dia mila marihanao ny toerana iaingana sy ny toerana halehana.

Azafady, avereno amin'ny fomba mazava kokoa ny fangatahanao. 🙏`;
        }

        setConversation(userId, {
            intention: prediction?.intention,
            language: prediction?.language.values,
            departure,
            destination,
            date
        })

        return `Ity ny fangatahanao: 

* FANONTANIANA VIDIN-DALANA 💰 *
_________________________

📍 Toerana iaingana : ${departure}
🎯 Toerana halehana : ${destination}
📅 Daty : ${date}

_________________________

Valio (1) raha tanterahina ny fangatahana vidin-dalana.
Valio (2) raha misy diso ka averina ny fangatahina`;
    },


    unknown: (prediction, traits) => {
        let greetings = ""

        if (traits === 1) {
            greetings = "Salama tompoko! 👋\n\n"
        }

        return `${greetings}Izaho dia afaka manampy anao hanao ireto :

🚌 Mitady voyage
💰 Mahafantatra ny vidin-dalana

Inona no azoko anampiana anao? 😊`;
    }
};


const buildFrenchMessage = {

    travel_search: (prediction, traits, userId) => {

        let greetings = ""

        if (traits === 1) {
            greetings = "Bonjour! 👋\n\n"
        }

        const departure =
            prediction.entities?.location?.departure?.body;

        const destination =
            prediction.entities?.location?.destination?.body;

        const date =
            prediction.entities?.datetime?.values;

        if (!departure || !destination || !date) {
            return `${greetings}Si vous voulez recherchez un voyage il faut mentionner le ville de depart, le ville de destination et la date.

Pourriez-vous reformuler votre demande, s'il vous plaît ? 🙏`;
        }

        setConversation(userId, {
            intention: prediction?.intention,
            language: prediction?.language.values,
            departure,
            destination,
            date
        })

        return `${greetings}Votre demande : 

* RECHERCHE DE VOYAGE 🚌 *
_________________________

📍 Départ : ${departure}
🎯 Destination : ${destination}
📅 Date : ${date}

_________________________

Répondez 1 pour rechercher le voyage.
Répondez 2 pour annuler et recommencer.
`;
    },


    price_request: (prediction, traits, userId) => {

        let greetings = ""

        if (traits === 1) {
            greetings = "Bonjour! 👋\n\n"
        }
        const departure =
            prediction.entities?.location?.departure?.body;

        const destination =
            prediction.entities?.location?.destination?.body;

        const date =
            prediction.entities?.datetime?.values;

        if (!departure || !destination || !date) {
            return `${greetings}Si vous voulez connaitre le prix d' un voyage il faut mentionner le ville de depart et le ville de destination.

Pourriez-vous reformuler votre demande, s'il vous plaît ? 🙏`;
        }

        setConversation(userId, {
            intention: prediction?.intention,
            language: prediction?.language.values,
            departure,
            destination,
            date
        })

        return `${greetings}Votre demande : 

* DEMANDE DE TARIF 💰 *
_________________________

📍 Départ : ${departure}
🎯 Destination : ${destination}
📅 Date : ${date}

_________________________

Répondez 1 pour afficher le prix du voyage.
Répondez 2 pour annuler et recommencer.`
    },


    unknown: (prediction, traits) => {
        let greetings = ""

        if (traits === 1) {
            greetings = "Bonjour! 👋\n\n"
        }

        return `${greetings}Actuellement je ne peux vous aidez qu'a :

🚌 Rechercher un voyage
💰 Connaître le prix d'un trajet`;
    }

};


export const processMessage = (responsePrediction, userId) => {
    const language = responsePrediction.language.values
    const intention = responsePrediction.intention
    const traits = responsePrediction.traits.id
    let builders = null;
    switch (language) {
        case "mg":
            builders = buildMalagasyMessage
            break;
        case "fr":
            builders = buildFrenchMessage
            break;
        default:
            break;
    }

    const builder = builders[intention]
    return builder(responsePrediction, traits, userId);
}