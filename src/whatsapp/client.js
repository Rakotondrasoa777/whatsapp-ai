import whatsapp from 'whatsapp-web.js';
const {Client, LocalAuth} = whatsapp
import qrcode from 'qrcode-terminal';
import { handeMessage } from './messageHandler.js';

export const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

client.once('ready', async () => {
    console.log('Client is ready!');
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('message', async (message) => {
    await handeMessage(message);
})
