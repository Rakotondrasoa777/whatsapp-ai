export const MAX_SENTENCE_LENGTH = 20
export const MAX_WORDS_NGRAMMS = 40
export const MAX_NGRAMMS = 20000
export const SENTENCE_NUMBER = 1

export const NB_ENTITIES = 10;
export const PAD_ENTITY = 9;

export const INTENTIONS = {
    travel_search: 0,
    price_request: 1,
    unknown: 2
};

export const ENTITIES = {
    O: 0,
    "B-DEP": 1,
    "I-DEP": 2,
    "B-DES": 3,
    "I-DES": 4,
    "B-DATE": 5,
    "I-DATE": 6,
    "B-TYPE": 7,
    "I-TYPE": 8,
    PAD: 9
};

export const BUS_TYPE = {
    unknown: 0,
    vip: 1,
    premium: 2,
    lite: 3
}


export const ID_STATION = {
    unknown: 0,
    antananarivo: 1,
    toamasina: 2,
    mahajanga: 3,
    finarantsoa: 4,
    morondava: 5,
    antsiranana: 6,
    ambatondrazaka: 7,
    antsirabe: 8
};

export const TRAITS = {
    unknown: 0,
    greetings: 1
}

export const LANGUAGE = {
    mg: 0,
    fr: 1
}

export const REVERSE_INTENTIONS = Object.fromEntries(
    Object.entries(INTENTIONS).map(([k, v]) => [v, k])
);

export const REVERSE_ENTITIES = Object.fromEntries(
    Object.entries(ENTITIES).map(([k, v]) => [v, k])
);

export const REVERSE_TRAITS = Object.fromEntries(
    Object.entries(TRAITS).map(([k, v]) => [v, k])
)

export const REVERSE_LANGUAGE = Object.fromEntries(
    Object.entries(LANGUAGE).map(([k, v]) => [v, k])
)