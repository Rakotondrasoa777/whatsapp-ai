import { translations } from "./messageTranslation.js";


export const buildPriceResultMessage = (
    priceResult,
    language = "fr"
) => {

    const translatedMessages =
        translations?.[language]?.price ??
        translations.fr.price;

    if (!priceResult?.success) {
        return translatedMessages.error;
    }

    if (priceResult.reason === "same_location") {
        return translatedMessages.sameLocation;
    }

    if (priceResult.reason === "route_not_found") {
        return translatedMessages.routeNotFound;
    }

    if (priceResult.reason === "category_not_available") {

        const category =
            priceResult.category?.toUpperCase() ?? "";

        return translatedMessages.categoryNotAvailable
            .replace("{category}", category);
    }

    if (!priceResult.found) {
        return translatedMessages.routeNotFound;
    }

    return (
        `${translatedMessages.title}\n\n` +

        `📍 ${translatedMessages.departure} : ` +
        `${priceResult.departure}\n` +

        `🎯 ${translatedMessages.destination} : ` +
        `${priceResult.destination}\n` +

        `🎟️ ${translatedMessages.bus} : ` +
        `${priceResult.category.toUpperCase()}\n` +

        `💰 ${translatedMessages.price} : ` +
        `${priceResult.price.toLocaleString("fr-FR")} Ar`
    );
};