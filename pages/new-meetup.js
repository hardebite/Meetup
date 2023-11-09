import { useRouter } from "next/router";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { Fragment } from "react";
import Head from "next/head";

const MeetUpPage = () => {
const router = useRouter(3)
  const addMeetUpHandler = async (enteredMeetUpData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    console.log(data);
    router.push('/');
  };
  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta name="description" content="Add your own meetups and create amazing networking opportunities"/>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetUpHandler} />;
    </Fragment>
  );
};
export default MeetUpPage;
