import dictionary from "../data/dictionary.js";
import { findClosestWord } from "../utils/closestWord.js";

export function dictionaryMatcher(token) {

    let key = token;

    if (!dictionary[key]) {
        key = findClosestWord(token, dictionary);
    }

    if (!key)
        return null;

    return {
        original: token,
        value: key,
        ...dictionary[key]
    };
}