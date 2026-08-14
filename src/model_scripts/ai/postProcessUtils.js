import {
    REVERSE_ENTITIES,
    NB_ENTITIES,
    PAD_ENTITY
} from "../utils/constants.js";

import { cleanEntity } from "../utils/cleanEntity.js";


const getBestIndex = (predictions) => {
    let bestIndex = 0;

    for (let i = 1; i < predictions.length; i++) {
        if (predictions[i] > predictions[bestIndex]) {
            bestIndex = i;
        }
    }

    return bestIndex;
};


const getBestEntityTag = (predictions, wordIndex) => {
    const startIndex = wordIndex * NB_ENTITIES;

    let bestTag = 0;

    for (let entity = 1; entity < NB_ENTITIES; entity++) {
        const currentIndex = startIndex + entity;

        if (
            predictions[currentIndex] >
            predictions[startIndex + bestTag]
        ) {
            bestTag = entity;
        }
    }

    return bestTag;
};


const extractEntities = (words, predictions) => {
    const entities = {
        departure: [],
        destination: [],
        date: [],
        bustype: []
    };

    for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {

        const bestTag = getBestEntityTag(
            predictions,
            wordIndex
        );

        if (bestTag === PAD_ENTITY) {
            continue;
        }

        const tagName = REVERSE_ENTITIES[bestTag];

        const word = cleanEntity(
            words[wordIndex].toLowerCase()
        );

        if (tagName.includes("DEP")) {
            entities.departure.push(word);
        }
        else if (tagName.includes("DES")) {
            entities.destination.push(word);
        }
        else if (tagName.includes("DATE")) {
            entities.date.push(word);
        }
        else if (tagName.includes("TYPE")) {
            entities.bustype.push(word)
        }
    }

    return entities;
};


export {
    getBestIndex,
    extractEntities
};