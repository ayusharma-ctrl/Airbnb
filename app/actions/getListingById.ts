import prisma from "@/app/libs/prismadb";

// this function will receive only property id in query
interface IParams {
    listingId?: string;
}

// function to get the details of a particular property/listing by Object Id
export default async function getListingById(
    params: IParams
) {
    try {
        // from query/url read the Object ID
        const { listingId } = params;
        // get the property details by listingId
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true // this is to get the user details who posted this property
            }
        });
        // handling the situation if unable to find a property details
        if (!listing) {
            return null;
        }
        // if we have the details, converting date objects to string before passing
        return {
            ...listing,
            createdAt: listing.createdAt.toString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toString(),
                updatedAt: listing.user.updatedAt.toString(),
                emailVerified: listing.user.emailVerified?.toString() || null,
            }
        };
    } catch (error: any) {
        throw new Error(error);
    }
}