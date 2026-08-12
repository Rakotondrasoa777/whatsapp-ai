import { deleteConversation } from "./conversationState.js";

const malagasyConversation = {

    travel_search: (conversations, userId, message) => {
        switch (message) {
            case "1":
                console.log("Ho tanterahiko ny fangatahanao !!")
                console.log(conversations);
                
                deleteConversation(userId)
                return;
            case "2":
                deleteConversation(userId)
                return "Misotra anao, afaka mamerina ny fangatahanao ianao"
            default:
                return `
Azafady! 

Miangavy anao amerina ny valiny :

    - Valio (1) ra tadiavina ilay zotra.
    - Valio (2) ra hajanona ary averina ny fangatahina`
        }
    },

    price_request: (conversations, userId, message) => {
        switch (message) {
            case "1":
                console.log("Ho tanterahiko ny fangatahanao!!")
                console.log(conversations);
                
                deleteConversation(userId)
                return;
            case "2":
                deleteConversation(userId)
                return "Misotra anao, afaka mamerina ny fangatahanao ianao"
            default:
                return `
Azafady! 

Miangavy anao amerina andefa ny valiny :

    - Valio (1) ra tanterahina ny fangatahana vidin-dalana.
    - Valio (2) ra hajanona ary averina ny fangatahina`
        }
    }

};

const frenchConversation = {

    travel_search: (conversations, userId, message) => {
        switch (message) {
            case "1":
                console.log("Je vais effectuer votre demande !!")
                console.log(conversations);
                
                deleteConversation(userId)
                return;
            case "2":
                deleteConversation(userId)
                return "Merci pour votre reponse, vous pouvez recommencer votre demande"
            default:
                return `
Excusez moi, Pouvez-vous renvoyer votre reponse :

    - Répondez 1 pour rechercher le voyage.
    - Répondez 2 pour annuler et recommencer.`
        }
    },

    price_request: (conversations, userId, message) => {
        switch (message) {
            case "1":
                
                console.log("Je vais effectuer votre demande !!")
                console.log(conversations);
                
                deleteConversation(userId)
                return;
            case "2":
                deleteConversation(userId)
                return "Merci pour votre reponse, vous pouvez recommencer votre demande"
            default:
                return `
Excusez moi, Pouvez-vous renvoyer votre reponse :

    - Répondez (1) pour afficher le prix du voyage.
    - Répondez (2) pour annuler et recommencer.`
        }
    }

};

export const processConversation = (conversations, userId, message) => {

    let handlers = null;

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

    const handler = handlers[conversations.intention];

    if (!handler) {
        return;
    }

    return handler(conversations, userId, message);
};