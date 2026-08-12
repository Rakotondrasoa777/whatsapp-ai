export const INTENTIONS = {
    travel_search: 0,
    price_quote: 1
};

export const ENTITIES = {
    O: 0,
    "B-DEP": 1,
    "I-DEP": 2,
    "B-DES": 3,
    "I-DES": 4,
    "B-DATE": 5,
    "I-DATE": 6,
    PAD: 7
};

export const ID_STATION = {
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
    greetings: 0,
    thanks: 1,
    bye: 2,
    "": 3
}

export const LANGUAGE = {
    MG: 0,
    FR: 1
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