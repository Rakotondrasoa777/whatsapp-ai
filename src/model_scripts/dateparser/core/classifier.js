import { numberMatcher } from "../matchers/numberMatcher.js";
import { timeMatcher } from "../matchers/timeMatcher.js";
import { dictionaryMatcher } from "../matchers/dictionaryMatcher.js";

const matchers = [
    numberMatcher,
    timeMatcher,
    dictionaryMatcher
];

export function classify(tokens) {

    const result = [];

    for (const token of tokens) {
        let found = null;
        for (const matcher of matchers) {
            found = matcher(token);

            if (found)
                break;
        }

        if (found) {
            result.push(found);
        } else {
            result.push({
                type: "UNKNOWN",
                value: token
            });
        }
    }
    return result;
}