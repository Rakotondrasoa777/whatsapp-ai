import { priceData } from "../price/priceData.js";


export const getTravelPrice = (
    departure,
    destination,
    category
) => {
    if (!departure || !destination) {

        return {
            success: true,
            found: false,
            price: null,
            reason: "missing_data"
        };
    }
   
    if (!category) {
        return {
            success: true,
            found: false,
            price: null,
            reason: "missing_bus"
        };
    }

    const normalizedDeparture =
        departure.trim().toLowerCase();

    const normalizedDestination =
        destination.trim().toLowerCase();

    let normalizedCategory =
        category.trim().toLowerCase();

    if (normalizedDeparture === normalizedDestination) {

        return {
            success: true,
            found: false,
            price: null,
            reason: "same_location"
        };
    }

    let route =
        priceData[normalizedDeparture]?.[
            normalizedDestination
        ];

    if (!route) {

        route =
            priceData[normalizedDestination]?.[
                normalizedDeparture
            ];
    }

    if (!route) {

        return {
            success: true,
            found: false,
            price: null,
            reason: "route_not_found"
        };
    }

    const price = route[normalizedCategory];

    if (price === undefined) {

        return {
            success: true,
            found: false,
            price: null,
            reason: "category_not_available",
            category: normalizedCategory
        };
    }

    return {
        success: true,
        found: true,
        price,
        departure: normalizedDeparture,
        destination: normalizedDestination,
        category: normalizedCategory
    };
};