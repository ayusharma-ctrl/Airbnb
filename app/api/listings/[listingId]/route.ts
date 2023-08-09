import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/currentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

// POST request to add a property to user's favorite list
// we'll be passing listingId in query
export async function POST(
    request: Request,
    { params }: { params: IParams }
) {

    // check for authentication
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    // read id from query
    const { listingId } = params;

    // validation
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    // add this new ID to an array of favorite properties
    let favoriteIds = [...(currentUser.favorite || [])];

    favoriteIds.push(listingId);

    // update the user details in db with latest favorite properties
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favorite: favoriteIds
        }
    });
    // return the updated user details in response in json format
    return NextResponse.json(user);
}


// DELETE request to remove a property from favorites list
export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    // every step is same as above function
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favorite || [])];
    // filter the previously saved list
    favoriteIds = favoriteIds.filter((id) => id !== listingId);
    // update the list
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favorite: favoriteIds
        }
    });
    // return the updated user details in response in json format
    return NextResponse.json(user);
}