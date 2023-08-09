import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./currentUser";

// function to get all the documents from listings which are user's favorites
export default async function getFavoriteListings() {
    try {
        //checking authentication
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }
        // fetching the data from db
        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favorite || [])]
                }
            }
        });
        // we need to convert the createdAt field from date object to string
        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toString(),
        }));

        return safeFavorites;
    } catch (error: any) {
        throw new Error(error);
    }
}