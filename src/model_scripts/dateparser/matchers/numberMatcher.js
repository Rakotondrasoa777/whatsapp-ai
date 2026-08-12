export function numberMatcher(token) {
    const value = Number(token);

    if (!Number.isInteger(value) || token.trim() === "") {
        return null;
    }

    return {
        type: "NUMBER",
        value
    };  
}