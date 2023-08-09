import getCurrentUser from "@/app/actions/currentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
    listingId?: string;
}

// page to display a specific property details
const ListingPage = async ({ params }: { params: IParams }) => {

    // validation check
    if (params?.listingId && params?.listingId?.length < 24) {
        return (
            <EmptyState
                title="Property not found!"
                subtitle="Please go back to home page or try again after some time."
            />
        );
    }

    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    // return this component if no info found
    if (!listing) {
        return (
            <EmptyState
                title="Property not found!"
                subtitle="Please go back to home page or try again after some time."
            />
        );
    }

    // return this if we have valid data to display
    return (
        <ListingClient
            listing={listing}
            reservations={reservations}
            currentUser={currentUser}
        />
    );
}

export default ListingPage;