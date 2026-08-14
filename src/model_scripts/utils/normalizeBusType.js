import { closest } from "fastest-levenshtein";
import { BUS_TYPE } from "./constants.js";

const VALID_BUS_TYPE = Object.keys(BUS_TYPE);

export function normalizeBusType(bustype) {

    if (!bustype)
        return "";

    bustype = bustype
        .toLowerCase()
        .trim();

    if (bustype in BUS_TYPE)
        return bustype;

    const bestMatch = closest(bustype, VALID_STATIONS);

    return bestMatch;
}