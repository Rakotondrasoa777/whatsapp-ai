export function normalize(text) {

    if (!text)
        return "";

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[.,!?;:()]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}
