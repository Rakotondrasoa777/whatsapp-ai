export function tokenize(text) {
    if(!text) {
        return []
    }

    return text.split(" ");
}
