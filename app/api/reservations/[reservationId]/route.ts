import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/currentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
}

// DELETE request to cancel a reservation - both user & owner
// Note: for now we have not implemented time-based conditions
export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    // authentication check
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }
    // read id from query
    const { reservationId } = params;
    // validation check
    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }
    // this way, both user and owner can cancel a reservation
    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } }
            ]
        }
    });

    return NextResponse.json(reservation);
}