import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/currentUser";
import getReservations from "@/app/actions/getReservations";
import ReservationsClient from "./ReservationsClient";

// page to display reservations for user's property
const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();
    // authentication
    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }
    // get documents from collection
    const reservations = await getReservations({ authorId: currentUser.id });

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No reservations found"
                subtitle="Looks like you have no reservations on your properties."
            />
        );
    }

    return (
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    );
}

export default ReservationsPage;