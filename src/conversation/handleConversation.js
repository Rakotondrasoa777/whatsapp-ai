import { deleteConversation, getConversation } from "./conversationState.js";
import { buildTravelResultMessage } from "../message/travelResultMessageBuilder.js";
import { buildPriceResultMessage } from "../message/priceResultMessageBuilder.js"
import { searchTravels } from "../service/travelService.js";
import { sendMessage } from "../whatsapp/sender.js";

import { getTravelPrice } from "../service/priceService.js";


const handleTravelSearch = async (conversations, userId) => {

    const travelResp = await searchTravels(
        conversations.idDep,
        conversations.idDes,
        conversations.date,
        conversations.bustype
    );

    const message = buildTravelResultMessage(
        travelResp,
        conversations.language
    );

    await sendMessage(
        userId,
        message
    );

    deleteConversation(userId);
};

const handlePriceRequest = async (conversation, userId) => {

    const priceResult = await getTravelPrice(
        conversation.departure,
        conversation.destination,
        conversation.bustype
    );

    const message = await buildPriceResultMessage(
            priceResult,
            conversation.language
        );
        
    await sendMessage(
        userId,
        message
    );

    deleteConversation(userId);
};

const malagasyConversation = {

    travel_search: async (
        conversations,
        userId,
        message
    ) => {

        switch (message) {

            case "1":

                await handleTravelSearch(
                    conversations,
                    userId
                );

                return;


            case "2":

                deleteConversation(userId);

                return "Misaotra anao, afaka mamerina ny fangatahanao ianao";


            default:

                return `
Azafady!

Miangavy anao avereno ny valiny :

- Valio (1) raha tadiavina ilay zotra.
- Valio (2) raha ajanona ary averina ny fangatahana.
`;
        }
    },

    price_request: async (
        conversations,
        userId,
        message
    ) => {

        switch (message) {

            case "1":

                await handlePriceRequest(
                    conversations,
                    userId
                );

                return;
            case "2":

                deleteConversation(userId);

                return "Misaotra anao, afaka mamerina ny fangatahanao ianao";


            default:

                return `
Azafady!

Miangavy anao avereno ny valiny :

- Valio (1) raha hijery ny vidin-dalana.
- Valio (2) raha ajanona ary averina ny fangatahana.
`;
        }
    }
};


const frenchConversation = {

    travel_search: async (
        conversations,
        userId,
        message
    ) => {

        switch (message) {

            case "1":

                await handleTravelSearch(
                    conversations,
                    userId
                );

                return;


            case "2":

                deleteConversation(userId);

                return "Merci pour votre réponse, vous pouvez recommencer votre demande.";


            default:

                return `
Excusez-moi, pouvez-vous renvoyer votre réponse :

- Répondez 1 pour rechercher le voyage.
- Répondez 2 pour annuler et recommencer.
`;
        }
    },

    price_request: async (
        conversations,
        userId,
        message
    ) => {

        switch (message) {

            case "1":

                await handlePriceRequest(
                    conversations,
                    userId
                );
                return;

            case "2":

                deleteConversation(userId);

                return "Merci pour votre réponse, vous pouvez recommencer votre demande.";


            default:

                return `
Excusez-moi, pouvez-vous renvoyer votre réponse :

- Répondez 1 pour afficher le prix du voyage.
- Répondez 2 pour annuler et recommencer.
`;
        }
    }
};

export const processConversation = (
    conversations,
    userId,
    message
) => {

    let handlers;


    switch (conversations.language) {

        case "mg":
            handlers = malagasyConversation;
            break;

        case "fr":
            handlers = frenchConversation;
            break;

        default:
            return;
    }


    const handler =
        handlers[conversations.intention];


    if (!handler) {
        return;
    }


    return handler(
        conversations,
        userId,
        message
    );
};