import { MongoClient } from "mongodb";

const handler =  async(req,res) => {
    if(req.method === 'POST'){
        const data = req.body;
        try {const client = await MongoClient.connect('mongodb+srv://hardebite:Adexturbo1234@cluster0.msmirmh.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();
        const meetupCollection = db.collection('meetups');
       const result = await meetupCollection.insertOne(data);
       console.log(result);
       client.close();
       res.status(201).json({message:'Meetup inserted'})
    //    res.send(result) 
    }
      catch(err){
        console.log(err);
      }
    }
};
export default handler