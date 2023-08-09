import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";
import getListings, { ListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/currentUser";


interface HomeProps {
  searchParams: ListingsParams
};


const Home = async ({ searchParams }: HomeProps) => {

  // fetch the properties data from database
  const listings = await getListings(searchParams);
  // get the user info
  const currentUser = await getCurrentUser();

  // if no such property found display below component
  if (listings.length === 0) {
    return (
        <EmptyState showReset />
    );
  }
  // else return below component
  return (
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8" >
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
  )
}

export default Home;