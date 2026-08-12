import { closest } from "fastest-levenshtein";
import { ID_STATION } from "./constants.js";

const VALID_STATIONS = Object.keys(ID_STATION);

export function normalizeStation(station) {

    if (!station)
        return "";

    switch (station) {
        case "diego":
            station = "antsiranana"
            break;
        case "majunga":
            station = "mahajanga"
            break;
        case "tamatave":
            station = "toamasina"
            break;
        case "tana":
            station = "antananarivo"
            break;
        default:
            break;
    }

    station = station
        .toLowerCase()
        .trim();

    if (station in ID_STATION)
        return station;

    const bestMatch = closest(station, VALID_STATIONS);

    return bestMatch;
}