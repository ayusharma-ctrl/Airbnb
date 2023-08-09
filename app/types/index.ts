import { Listing, Reservation, User } from "@prisma/client";

// we just can't pass date objects from server to client, we can only pass plain objects
// that is why we have to create or define a Safe type for all those, wherever we have dates

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string;
};

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
};

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};