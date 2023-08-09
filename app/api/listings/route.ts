import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "../../actions/currentUser";

// POST request to add a new property
export async function POST(request: Request,) {
    // check for authentication
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }
    // extract info from req.body
    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,
    } = body;

    // create a new document in collection
    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}