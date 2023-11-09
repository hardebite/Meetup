import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";
import Head from "next/head";
const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta name="description" content="Browse a huge list of active meetups"/>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};
export const getStaticProps = async () => {
  // will call this before rendering the page
  // the code in here will be executed on he server side not on the client side
  //fetch data from Api
  // faster than getserversideprops
  const client = await MongoClient.connect(
    process.env.database
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, //to make sure your data is never older than 10 seconds
  };
};
// export const getServerSideProps = async(context) => {
//   //fetch api and can also run server side code and authentication
//   //to have access to res and req or zif the data changes too many times
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };
export default HomePage;
