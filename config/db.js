
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://bhavna:bhavna@cluster0.0wltn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = () => {

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        client.connect(err => {
            const collection = client.db("test").collection("devices");
            // perform actions on the collection object
            client.close();
        });
    }
    catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

export default connectDB;