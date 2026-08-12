export default function absoluteRule(context, tokens) {

    const number = tokens.find(token => token.type === "NUMBER");
    const month = tokens.find(token => token.type === "MONTH");

    if (!number || !month)
        return;

    context.datetime.setMonth(month.month);
    context.datetime.setDate(number.value);

}