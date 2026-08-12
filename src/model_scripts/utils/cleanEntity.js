export function cleanEntity(text) {

    if (!text)
        return text;

    if (text === "none")
        return text;

    text = text.trim();

    return text.replace(/^[.,!?;:\s]+|[.,!?;:\s]+$/g, "");
}