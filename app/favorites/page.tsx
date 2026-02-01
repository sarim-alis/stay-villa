import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";



const ListingPage = async () => {
    return (
      <div>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </div>
    )
}

export default ListingPage;
