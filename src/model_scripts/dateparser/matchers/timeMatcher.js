export function timeMatcher(token) {
    const match = token.match(/^(\d{1,2})(h|:)(\d{0,2})$/);

    if (!match)
        return null;

    return {
        type: "TIME",
        hour: Number(match[1]),
        minute: Number(match[3] || 0)
    };
}