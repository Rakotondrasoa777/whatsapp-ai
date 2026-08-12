export function relativeRule(context, tokens) {

    const relative = tokens.find(
        token => token.type === "RELATIVE_DAY"
    );

    if (!relative)
        return;

    context.datetime.setDate(
        context.datetime.getDate() + relative.offset
    );
}

export function timeRule(context, tokens) {

    const time = tokens.find(
        token => token.type === "TIME"
    );

    if (!time)
        return;

    context.datetime.setHours(
        time.hour,
        time.minute,
        0,
        0
    );
}

export function weekdayRule(context, tokens) {

    const weekdayToken = tokens.find(
        token => token.type === "WEEKDAY"
    );

    if (!weekdayToken)
        return;

    const currentDate = context.datetime;
    const currentDay = currentDate.getDay();
    const targetDay = weekdayToken.weekday;
    let difference = targetDay - currentDay;

    if (difference <= 0) {
        difference += 7;
    }

    currentDate.setDate(
        currentDate.getDate() + difference
    );

}

export function periodRule(context, tokens) {

    const periodToken = tokens.find(
        token => token.type === "PERIOD"
    );

    if (!periodToken)
        return;

    let hour;

    switch (periodToken.period) {
        case "MORNING":
            hour = 8;
            break;
        case "AFTERNOON":
            hour = 14;
            break;
        case "EVENING":
            hour = 18;
            break;
        case "NIGHT":
            hour = 20;
            break;
        default:
            return;

    }

    const hasExactTime = tokens.some(
        token => token.type === "TIME"
    );

    if (!hasExactTime) {
        context.datetime.setHours(
            hour,
            0,
            0,
            0
        );
    }
}

