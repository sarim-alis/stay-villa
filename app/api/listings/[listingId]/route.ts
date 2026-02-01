import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


interface IParams {
    listingId?: string;
}

export async function DELETE(
    request: Request,
    context: { params: IParams | Promise<IParams> }
) {
    const { params } = context;
    const resolvedParams = await params;
    
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = resolvedParams;

    if (!listingId || typeof listingId !== 'string') {
        return NextResponse.error();
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}