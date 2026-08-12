import {
    REVERSE_INTENTIONS,
    REVERSE_LANGUAGE,
    REVERSE_TRAITS,
    ID_STATION
} from "../utils/constants.js";

import { normalizeStation } from "../utils/normalizeStation.js";
import { parseDate } from "../dateparser/index.js";

import {
    getBestIndex,
    extractEntities
} from "./postprocessUtils.js";


const DEFAULT_DEPARTURE = "antananarivo";


export function postprocess(sentence, outputs) {

    const words = sentence.trim().split(/\s+/);

    const predIntent = outputs.output_intention.data;
    const predEntities = outputs.output_entities.data;
    const predLanguage = outputs.output_language.data;
    const predTraits = outputs.output_traits.data;


    const bestIntent = getBestIndex(predIntent);

    const bestLanguage = getBestIndex(predLanguage);

    const bestTraits = getBestIndex(predTraits);


    const entities = extractEntities(
        words,
        predEntities
    );


    let departure = normalizeStation(
        entities.departure.join(" ")
    );

    if (departure === "unknown" || departure === "") {
        departure = DEFAULT_DEPARTURE;
    }

    const destination = normalizeStation(
        entities.destination.join(" ")
    );

    const date = entities.date.join(" ");

    return {
        text: sentence,
        intention: REVERSE_INTENTIONS[bestIntent],
        entities: {
            location: {
                departure: {
                    id: ID_STATION[departure],
                    body: departure
                },
                destination: {
                    id: ID_STATION[destination],
                    body: destination
                }
            },
            datetime: {
                body: date,
                values: parseDate(date).toLocaleString("fr-FR")
            }
        },
        language: {
            values: REVERSE_LANGUAGE[bestLanguage]
        },
        traits: {
            id: bestTraits,
            values: REVERSE_TRAITS[bestTraits]
        }
    };
}