import { predict } from "../src/model_scripts/ai/index.js";
import { processMessage } from "../src/message/messageBuilder.js";

const prediction = await predict("Je veux aller a Antananarivo")

const response = await processMessage(prediction);

console.log(response);
