import absoluteRule from "./rules/absolutRules.js";
import { periodRule, relativeRule, timeRule, weekdayRule } from "./rules/dateRules.js";

const rules = [
    relativeRule,
    absoluteRule,
    timeRule,
    weekdayRule,
    periodRule
]

export function execute(tokens) {

    const context = {
        datetime: new Date(),
    };

    for(const rule of rules) {
        rule(context, tokens)
    }

    return context.datetime;
}