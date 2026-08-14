import { translations } from "./messageTranslation.js";


export const buildTravelResultMessage = (
    travelResult,
    language = "fr"
) => {

    const translatedMessages =
        translations[language].travel ||
        translations.fr.travel;

    if (!travelResult?.success) {
        return translatedMessages.error;
    }

    if (
        !travelResult.found ||
        !travelResult.trips ||
        travelResult.trips.length === 0
    ) {
        return translatedMessages.noTrips;
    }


    const trips = travelResult.trips;

    const firstTrip = trips[0];


    const date = new Date(firstTrip.date);

    const formattedDate =
        date.toLocaleDateString(
            "fr-FR",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


    let message =
        `${translatedMessages.title}\n\n` +
        `📍 ${firstTrip.departure} → ${firstTrip.destination}\n` +
        `📅 ${formattedDate}\n\n`;


    for (const trip of trips) {

        message +=
            `━━━━━━━━━━━━━━\n` +
            `🎫 *${trip.category}*\n` +
            `🕐 ${translatedMessages.departure} : ${trip.departureTime}\n` +
            `💰 ${translatedMessages.price} : ${trip.price.toLocaleString("fr-FR")} Ar\n` +
            `💺 ${translatedMessages.seats} : ${trip.availableSeats}\n\n`;
    }


    return message;
};