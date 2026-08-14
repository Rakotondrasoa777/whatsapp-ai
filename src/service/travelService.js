import { getTravels } from "../api/travelApi.js";

export const searchTravels = async (idDep, idDes, date, category = null) => {
    try {
        const data = await getTravels({
            idDep,
            idDes,
            date
        });

        if (!Array.isArray(data) || data.length === 0) {
            return {
                success: true,
                found: false,
                trips: []
            };
        }

        let trips = data.map(trip => ({
            id: trip.id,
            departure: trip.terminal_departure.name,
            destination: trip.terminal_arrival.name,
            date: trip.departure,
            departureTime: trip.departureTime,
            price: trip.price,
            category: trip.category,
            availableSeats: trip.seatAvailable
        }));

        if (category) {

            category =
                category.toLowerCase() === "lite"
                    ? "ECONOMY"
                    : category.toUpperCase();

            trips = trips.filter(
                trip =>
                    trip.category?.toUpperCase() === category
            );
        }

        if (trips.length === 0) {
            return {
                success: true,
                found: false,
                trips: []
            };
        }

        return {
            success: true,
            found: true,
            trips
        };

    } catch (error) {

        console.error(
            "Erreur lors de la recherche des voyages :",
            error.message
        );

        return {
            success: false,
            found: false,
            trips: [],
            error: "Impossible de récupérer les voyages."
        };
    }
};