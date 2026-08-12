import { predict as runModel } from "./predictor.js";
import { postprocess } from "./postprocess.js";

export async function predict(sentence) {
    
    const outputs = await runModel(sentence);

    return postprocess(sentence, outputs);

}