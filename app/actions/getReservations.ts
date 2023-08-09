import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

// This is a versatile function that can be employed to handle various types of requests.
// It can be used to view all reservations made by a user.
// It can be used to view all reservations made for a user's property.
// It can also be used to view all reservations made for a specific property.
export default async function getReservations(params: IParams) {
    try {
        // extract all from the query
        const { listingId, userId, authorId } = params;
        // create an query object..
        const query: any = {};
        // check for a valid parameter and add it to query object
        if (listingId) {
            query.listingId = listingId;
        };

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.listing = { userId: authorId };
        }
        // get details of all the reservations based on query passed and sort it before sending
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        // again as we all know, we can't pass a date object from server to client, we need to convert it
        const safeReservations = reservations.map(
            (reservation) => ({
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.listing,
                    createdAt: reservation.listing.createdAt.toISOString(),
                },
            }));

        return safeReservations;
    } catch (error: any) {
        throw new Error(error);
    }
}