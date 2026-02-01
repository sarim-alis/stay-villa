import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


interface IParams {
    reservationId?: string;
};

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

    const { reservationId } = resolvedParams;

    if (!reservationId || typeof reservationId !== 'string') {
        return NextResponse.error();
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id }}
            ]
        }
    });

    return NextResponse.json(reservation);
}
