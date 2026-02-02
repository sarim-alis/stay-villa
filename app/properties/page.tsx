import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";


const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
     return (
      <div>
        <EmptyState
            title="Unauthorized"
            subtitle="Please login"
        />
      </div>
     )
   }

   const listings = await getListings({
        userId: currentUser.id
   });

   const safeListings = listings.map((listing) => ({
       ...listing,
       createdAt: listing.createdAt.toISOString(),
   }));

   const safeUser = {
       ...currentUser,
       createdAt: currentUser.createdAt.toISOString(),
       updatedAt: currentUser.updatedAt.toISOString(),
       emailVerified: currentUser.emailVerified?.toISOString() || null,
   };

   if (safeListings.length === 0) {
    return (
      <div>
        <EmptyState
            title="No properties found"
            subtitle="Looks like you have no properties."
        />
      </div>
    )
   }

   return (
    <div>
      <PropertiesClient
        listings={safeListings}
        currentUser={safeUser}
      />
    </div>
   )
}

export default PropertiesPage;