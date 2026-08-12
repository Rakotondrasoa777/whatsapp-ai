import { distance } from "fastest-levenshtein";

export function findClosestWord(word, dictionary) {

    let best = null;
    let score = Infinity;

    for (const key of Object.keys(dictionary)) {
        const d = distance(word, key);
        if (d < score) {
            score = d;
            best = key;
        }
    }

    if (score <= 2)
        return best;

    return null;

}