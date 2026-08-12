import { md5ToBigInt } from "./hash.js";

export function wordToSubwords(
    word,
    numBuckets = 20000,
    minN = 3,
    maxN = 5
) {
    const decoratedWord = `<${word}>`;

    const indices = [];

    for (let n = minN; n <= maxN; n++) {
        for (let i = 0; i <= decoratedWord.length - n; i++) {

            const ngram = decoratedWord.substring(i, i + n);

            const hashInt = md5ToBigInt(ngram);

            const index =
                Number(hashInt % BigInt(numBuckets - 1)) + 1;

            indices.push(index);
        }
    }

    return indices;
}

