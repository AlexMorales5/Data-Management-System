const { MongoClient } = require("mongodb");
const fs = require("fs");  // This is needed to write the data to a file

// Your connection string to MongoDB
const uri = "mongodb+srv://CamrysCHS:purdueEPICS@cluster0.qwnbt.mongodb.net/";

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function fetchData() {
  let dataArray = [];  // Create an empty array to store the data

  try {
    // Connect to MongoDB
    await client.connect();

    // Access the database and collection
    const database = client.db("studentData");  // Your database name
    const collection = database.collection("GPAs");  // Your collection name

    // Fetch all the documents from the collection and store them in the dataArray
    dataArray = await collection.find().toArray();

    // Print the data to the console (so you can see it)
    console.log("Data from GPAs collection:", dataArray);

    // Write the data to a file called 'data.json'
    fs.writeFileSync('data.json', JSON.stringify(dataArray, null, 2), 'utf-8');
    console.log("Data saved to data.json");

  } catch (err) {
    console.error("Error connecting to the database or fetching data:", err);
  } finally {
    // Close the connection to MongoDB
    await client.close();
  }

  return dataArray;  // Return the data if needed elsewhere
}

fetchData().then(data => {
  console.log("Stored data:", data);  // This will print the data after saving
});
