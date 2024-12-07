```javascript
const MongoClient = require('mongodb').MongoClient;

async function updateDocument() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('myDatabase');
    const collection = db.collection('myCollection');

    // Corrected update operation.  Uses insertOne if the document doesn't exist.
    const filter = { name: 'John Doe' };
    const updateDoc = { $set: { age: 30 } };
    const result = await collection.updateOne(filter, updateDoc);
    if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      await collection.insertOne({ name: 'John Doe', age: 30 });
    }
    console.log(result);
  } finally {
    await client.close();
  }
}

updateDocument();
```