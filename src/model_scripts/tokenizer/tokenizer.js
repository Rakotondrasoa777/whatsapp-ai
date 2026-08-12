import { wordToSubwords } from "./subword.js";

export function tokenizeSentences(
    sentences,
    maxWords = 20,
    maxNgrams = 40,
    numBuckets = 20000
) {

    const totalSize = sentences.length * maxWords * maxNgrams;

    const tensor = new Int32Array(totalSize);

    for (let phraseIndex = 0; phraseIndex < sentences.length; phraseIndex++) {

        const words = String(sentences[phraseIndex])
            .toLowerCase()
            .split(/\s+/)
            .slice(0, maxWords);

        for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {

            const ngrams = wordToSubwords( words[wordIndex], numBuckets ).slice(0, maxNgrams);

            for ( let ngramIndex = 0; ngramIndex < ngrams.length; ngramIndex++ ) {

                const flatIndex =
                    phraseIndex * maxWords * maxNgrams +
                    wordIndex * maxNgrams +
                    ngramIndex;

                tensor[flatIndex] = ngrams[ngramIndex];
            }
        }
    }

    return tensor;
}