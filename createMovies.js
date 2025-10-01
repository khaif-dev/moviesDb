// ALL IIN ONE APPROACH
// import mongoDB client
const { MongoClient } = require('mongodb'); /* Native Driver */

const URI = 'mongodb://localhost:27017/';

// target database and collection
const dbName = 'moviesDB';
const collectionName = 'movies';

// defining the movies i want to insert
const movies = [
  {
    "name": "Inception",
    "yearReleased": 2010,
    "starringCharacter": "Leonardo DiCaprio",
    "productionHouse": "Warner Bros.",
    "rating": 8.8
  },
  {
    "name": "The Dark Knight",
    "yearReleased": 2008,
    "starringCharacter": "Christian Bale",
    "productionHouse": "Warner Bros.",
    "rating": 9.0
  },
  {
    "name": "The Shawshank Redemption",
    "yearReleased": 1994,
    "starringCharacter": "Tim Robbins",
    "productionHouse": "Columbia Pictures",
    "rating": 9.3
  },
  {
    "name": "The Godfather",
    "yearReleased": 1972,
    "starringCharacter": "Marlon Brando",
    "productionHouse": "Paramount Pictures",
    "rating": 9.2
  },
  {
    "name": "Pulp Fiction",
    "yearReleased": 1994,
    "starringCharacter": "John Travolta",
    "productionHouse": "Miramax Films",
    "rating": 8.9
  },
  {
    "name": "The Matrix",
    "yearReleased": 1999,
    "starringCharacter": "Keanu Reeves",
    "productionHouse": "Warner Bros.",
    "rating": 8.7
  },
  {
    "name": "Forrest Gump",
    "yearReleased": 1994,
    "starringCharacter": "Tom Hanks",
    "productionHouse": "Paramount Pictures",
    "rating": 8.8
  },
  {
    "name": "The Lord of the Rings: The Fellowship of the Ring",
    "yearReleased": 2001,
    "starringCharacter": "Elijah Wood",
    "productionHouse": "New Line Cinema",
    "rating": 8.8
  },
  {
    "name": "Gladiator",
    "yearReleased": 2000,
    "starringCharacter": "Russell Crowe",
    "productionHouse": "DreamWorks",
    "rating": 8.5
  },
  {
    "name": "Fight Club",
    "yearReleased": 1999,
    "starringCharacter": "Brad Pitt",
    "productionHouse": "20th Century Fox",
    "rating": 8.8
  }
];

// function to connect to database
async function insertMovie(){
    const client = new MongoClient(URI);

    try{
        await client.connect();
        console.log('connected to mongodb');
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);      

        // check if collection has document
        const count = await collection.countDocuments();
        console.log('documents:', count);
        // drop existing documents if any
        if(count>0){
            console.log(`collection contains ${count} documents. Dropping collection...`)
            await collection.drop();
            console.log('collection dropped successfully');
        }
        
        // insert the movies in the collection
        const results = await collection.insertMany(movies);
        console.log(`${results.insertedCount} added to database`);

        // display the books
        const insertedMovies = await collection.find({}).toArray();
        insertedMovies.forEach((movies, index)=>{
            console.log(`${index + 1}. "${movies.name}" by ${movies.productionHouse} (${movies.yearReleased})`);
        });

    }catch(err){
        console.log('error occured:',err);
    }finally{
        client.close();
        console.log('connection closed');
    }
}

insertMovie();




