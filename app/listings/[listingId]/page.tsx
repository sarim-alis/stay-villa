import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";




interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams | Promise<IParams> }) => {
  const resolvedParams = await params;
  const listing = await getListingById(resolvedParams);
  const reservations = await getReservations({ listingId: resolvedParams.listingId });
  const currentUser = await getCurrentUser();

  const safeUser = currentUser ? {
    ...currentUser,
    createdAt: currentUser.createdAt.toISOString(),
    updatedAt: currentUser.updatedAt.toISOString(),
    emailVerified: currentUser.emailVerified?.toISOString() || null,
  } : null;

  if (!listing) {
    return (
      <div>
        <EmptyState />
      </div>
    )
  }

  return (
    <div>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={safeUser}
      />
    </div>
  );
};

export default ListingPage;