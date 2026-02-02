import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";


const TripsPage = async () => {
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

   const reservations = await getReservations({
        userId: currentUser.id
   });

   const safeUser = {
       ...currentUser,
       createdAt: currentUser.createdAt.toISOString(),
       updatedAt: currentUser.updatedAt.toISOString(),
       emailVerified: currentUser.emailVerified?.toISOString() || null,
   };

   if (reservations.length === 0) {
    return (
      <div>
        <EmptyState
            title="No trips found"
            subtitle="Looks like you have not reserved any trips."
        />
      </div>
    )
   }

   return (
    <div>
      <TripsClient
        reservations={reservations}
        currentUser={safeUser}
      />
    </div>
   )
}

export default TripsPage;