import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";



const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <div>
              <EmptyState
                title="Unauthorized"
                subtitle="Please login"
              />
            </div>
        );
    }

    const reservations = await getReservations({
        authorId: currentUser.id
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
               title="No reservations found"
               subtitle="Looks like you have no reserations on your properties"
             />
            </div>
        )
    }

    return (
        <div>
          <ReservationsClient
            reservations={reservations}
            currentUser={safeUser}
          />
        </div>
    )
};

export default ReservationsPage;