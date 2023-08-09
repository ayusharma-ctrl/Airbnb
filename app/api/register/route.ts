import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';

// POST request to register a user
export async function POST(request: Request) {
    // fetch email, name , pass from req.body
    const body = await request.json();

    const { email, name, password } = body;
    // hashed the password
    const hashedPassword = await bcrypt.hash(password, 12);
    // Note: we don't need to check if already a document exist with this email, 
    // we have already defined in Prisma that in each document email should be unique,
    // it will throw an error if that's not the case
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword,
        }
    });
    // return this newly added user in response
    return NextResponse.json(user);
}
