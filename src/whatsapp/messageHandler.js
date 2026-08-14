import { predict } from "../model_scripts/ai/index.js";
import { processMessage } from "../message/messageProcessor.js"
import { sendMessage } from "./sender.js";
import { getConversation, setConversation, deleteConversation } from "../conversation/conversationState.js";
import { processConversation } from "../conversation/handleConversation.js"

export async function handeMessage(message) {
    try {
        const userId = message.from
        const text = message.body

        const conversation = await getConversation(userId)

        if (conversation) {

            const conversationResponse = await processConversation(conversation, userId, text)

            if (conversationResponse) {
                await sendMessage(userId, conversationResponse)
            }

            return;
        }

        const prediction = await predict(text);
        const response = await processMessage(prediction, userId);

        await sendMessage(userId, response);

    } catch (error) {
        console.error("Erreur de traitement du message", error);
    }
}