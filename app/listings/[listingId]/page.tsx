import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";


interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams | Promise<IParams> }) => {
  const resolvedParams = await params;
  const listing = await getListingById(resolvedParams);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <div>
        <EmptyState />
      </div>
    )
  }

  return (
    <div>
      {/* <ListingClient
        listing={listing}
        currentUser={currentUser}
      /> */}
      {listing.title}
    </div>
  );
};

export default ListingPage;