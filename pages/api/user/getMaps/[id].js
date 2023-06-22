import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb+srv://admin:admin@portalize.gkq1arb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export default async function run(req, res) {
  try {
    const {id} = req.query
    const database = client.db("test");
    const movies = database.collection("users");
    // Query for a movie that has the title 'The Room'
    const query = {};
    const options = {
      // sort matched documents in descending order by rating
    //   sort: { "imdb.rating": -1 }, 
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, name: 0, image: 0, email: 0, maps: 1 },
    };
    const movie = await movies.findOne(query, options);
    res.json(movie);
} finally{
  client.close();
}
}

