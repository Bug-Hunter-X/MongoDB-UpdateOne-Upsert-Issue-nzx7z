```javascript
const MongoClient = require('mongodb').MongoClient;

async function updateDocument() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('myDatabase');
    const collection = db.collection('myCollection');

    // Incorrect update operation leading to unexpected results
    const result = await collection.updateOne({ name: 'John Doe' }, { $set: { age: 30 } }, { upsert: true });
    console.log(result);
  } finally {
    await client.close();
  }
}

updateDocument();
```