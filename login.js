// Mongodb class
class Mongodb {
  constructor() {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    this.uri = "mongodb+srv://yashyadavpro:\"Alonecurse\"@cluster0.ejmvwws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    this.client = new MongoClient(this.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    this.database = null;
    this.collection = null;
  }

  async connectDatabase() {
    try {
      // Connect the client to the server
      await this.client.connect();
      console.log('Connected to MongoDB');

      // Access the existing database and collection
      this.database = this.client.db('sign_in');
      this.collection = this.database.collection('USER_INFO');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }

  async insertDocument(doc) {
    // Check if the collection is available
    if (!this.collection) {
      console.error('MongoDB collection is not available');
      return;
    }

    try {
      // Insert the document into the collection
      const result = await this.collection.insertOne(doc);
      console.log(`Inserted ${result.insertedCount} document`);
    } catch (err) {
      console.error(`Error inserting document: ${err}`);
    }
  }
}

// jQuery code
$(document).ready(function() {
  $("button").click(function() {
    const name = $("#name").val();
    const email = $("#email").val();
    const password = $("#password").val();

    const newUser = {
      name: name,
      email: email,
      password: password
    };

    const mongodb = new Mongodb();
    executeMongoOperations(mongodb, newUser);
  });

  async function executeMongoOperations(mongodb, newUser) {
    try {
      await mongodb.connectDatabase();
      await mongodb.insertDocument(newUser);
      await mongodb.client.close();
      console.log('MongoDB operations completed successfully.');
    } catch (err) {
      console.error('Error executing MongoDB operations:', err);
    }
  }
});