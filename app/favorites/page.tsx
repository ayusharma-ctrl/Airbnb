import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/currentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

// page to display all your favorite properties
const ListingPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();
    // if there's no data then display EmptyState component
    if (listings.length === 0) {
        return (
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorite listings."
                />
        );
    }
    // if we have data then display below component
    return (
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />
    );
}

export default ListingPage;