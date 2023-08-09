import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/currentUser";

// POST request to create a new reservation
export async function POST(request: Request) {
    // authentication check
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }
    // destructure data from body
    const body = await request.json();
    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body;
    // validation check as all this data is important and must be there
    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }
    // adding a new document and creating a reservation
    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId // find a requested property
        }, 
        // adding this reservation for this property
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                }
            }
        }
    });
    // return the details in response
    return NextResponse.json(listingAndReservation);
}