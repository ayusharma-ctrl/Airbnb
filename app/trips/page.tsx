import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/currentUser";
import getReservations from "@/app/actions/getReservations";
import TripsClient from "./TripClient";

// page to display reservations booked by a user
const TripsPage = async () => {
    const currentUser = await getCurrentUser();
    // authentication check  
    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please Login!"
            />
        );
    }
    // get all the documents
    const reservations = await getReservations({ userId: currentUser.id });

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No trips found"
                subtitle="Looks like you haven't reserved any trips."
            />
        );
    }

    return (
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
    );
}

export default TripsPage;