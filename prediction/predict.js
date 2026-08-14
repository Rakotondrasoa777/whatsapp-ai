import { predict } from "../src/model_scripts/ai/index.js";
import { processMessage } from "../src/message/messageProcessor.js";
import { searchTravels } from "../src/service/travelService.js";

const prediction = await predict("Otrin zotra antananarivo mahajanga classe VIP")

console.log(prediction.entities);