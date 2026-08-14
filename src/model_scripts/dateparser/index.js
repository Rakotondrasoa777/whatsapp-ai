import { normalize } from "./core/normalize.js";
import { tokenize } from "./core/tokenize.js";
import { classify } from "./core/classifier.js";
import { execute } from "./rulesEngine.js";


export function parseDate(text){

    const normalized = normalize(text);
    const tokens = tokenize(normalized);
    const classifiedTokens = classify(tokens);    
    const datetime = execute(classifiedTokens);

    const [datePart, time] = datetime.toLocaleString("fr-FR").split(" ");
    const [day, month, year] = datePart.split("/");

    return {
        date: `${year}-${month}-${day}`,
        time
    }

}
