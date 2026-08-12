import { client } from './client.js';

export async function sendMessage(userId, text) {

    try {
        await client.sendMessage(userId,text);

        console.log(`Message envoye a ${userId}`);

    } catch (error) {

        console.error(
            'Erreur envoi message :',
            error
        );

    }
}
