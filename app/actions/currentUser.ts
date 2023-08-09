import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from '@/app/libs/prismadb';

// this function is to check whether a user is authenticated or not, if yes then return User's information from db
export default async function getCurrentUser() {
    try {
        const session = await getServerSession(authOptions);
        // checking if any session exist, if yes then does it have a valid email or not
        if (!session?.user?.email) {
            return null;
        }
        // if yes then trying to get the user details from db
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            }
        });
        // return null if unable to find user details
        if (!currentUser) {
            return null;
        }
        // return the user details if user found
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(), // can't transfer date object from server to client, that's why we are converting it
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified:
                currentUser.emailVerified?.toISOString() || null,
        };
    } catch (error: any) {
        console.log(error)
        return null;
    }
}
