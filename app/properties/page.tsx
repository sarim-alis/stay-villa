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

   if (listings.length === 0) {
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
        listings={listings}
        currentUser={currentUser}
      />
    </div>
   )
}

export default PropertiesPage;