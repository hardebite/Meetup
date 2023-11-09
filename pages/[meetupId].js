import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../components/meetups/MeetupDetails";
import { Fragment } from "react";
import Head from "next/head";

const MeetupDetails = (props) => {
    return (
        <Fragment>
          <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.description}/>
          </Head>
          <MeetupDetail title= {props.meetupData.title}
            img={props.meetupData.image}
            address= {props.meetupData.address} description={props.meetupData.description} />
        </Fragment>
      ); 
};
export const getStaticPaths= async () => {
    const client = await MongoClient.connect(process.env.database);
const db = client.db();
const meetupsCollection = db.collection('meetups');
const meetups = await meetupsCollection.find({},{_id:1}).toArray();
client.close()

    return{
        fallback:false,
        paths:meetups.map(meetup=> ({params:{meetupId: meetup._id.toString()}}))
        
      
    }
}
export const getStaticProps = async(context) => {
    const meetupId = context.params.meetupId;
const client = await MongoClient.connect(process.env.database);
const db = client.db();
const meetupCollection = db.collection('meetups');
const selectedMeetup= await meetupCollection.findOne({_id:new ObjectId(meetupId)});// so that the id can be serialized back
client.close()

    
    
    return{
        props:{
            meetupData :{
                id:selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                description:selectedMeetup.description,
                image:selectedMeetup.image
            },
        }
    }
}
export default MeetupDetails;
