import {MongoClient} from 'mongodb';

const CONNECTION_URL = 'mongodb://localhost:27017/admin';
const DB_NAME = "";

const client = new MongoClient(CONNECTION_URL);

async function connection(){
    try{
        await client.connect();
        console.log("DB onnected SuccessFully");
        const db = client.db(DB_NAME);
        return db;
    }
    catch(err){
        console.log("db connection failed");
    }
}

export default connection;