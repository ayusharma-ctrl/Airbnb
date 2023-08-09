import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/currentUser";
import getListings from "@/app/actions/getListings";
import PropertiesClient from "./PropertiesClient";

// page to display all the properties posted by a user
const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();
    // authenticate user
    if (!currentUser) {
        return <EmptyState
            title="Unauthorized"
            subtitle="Please login"
        />
    }
    // get all properties from db
    const listings = await getListings({ userId: currentUser.id });
    // if no such property found -  display below component
    if (listings.length === 0) {
        return (
                <EmptyState
                    title="No properties found"
                    subtitle="Looks like you have no properties."
                />
        );
    }
    // else show this
    return (
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
    );
}

export default PropertiesPage;