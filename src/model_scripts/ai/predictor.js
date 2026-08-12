import * as ort from "onnxruntime-node";

import { tokenizeSentences } from "../tokenizer/tokenizer.js";
import { loadModel } from "./model.js";
import { MAX_NGRAMMS, MAX_SENTENCE_LENGTH, MAX_WORDS_NGRAMMS, SENTENCE_NUMBER } from "../utils/constants.js";

export async function predict(sentence) {

    const session = await loadModel();

    const tokens = tokenizeSentences(
        [sentence],
        MAX_SENTENCE_LENGTH,
        MAX_WORDS_NGRAMMS,
        MAX_NGRAMMS
    );

    const inputTensor = new ort.Tensor(
        "int32",
        tokens,
        [SENTENCE_NUMBER, MAX_SENTENCE_LENGTH, MAX_WORDS_NGRAMMS]
    );

    const feeds = {
        input: inputTensor
    };

    const outputs = await session.run(feeds);

    return outputs;
}