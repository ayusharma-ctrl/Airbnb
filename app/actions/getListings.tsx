import prisma from "@/app/libs/prismadb";

// these queries can be passed
export interface ListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

// this function is to get the details of various properties which are available on Airbnb based on following filters
// we'll be passing these filters in query - so we don't need to add an additional api or func at the client side
export default async function getListings(params: ListingsParams) {
    try {
        const {
            userId,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category,
        } = params;

        // query object will have all the filter details
        // first we check if what all filters we are passing in query, if they are valid filters then we will add them to query object
        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        // once we are done with checking all the filters, let's try to fetch all the documents and sort them
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        // again as we all know, we can't pass a date object from server to client, we need to convert it
        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}