const mongoClient = require('mongodb').MongoClient;
const assert = require('assert'); 

const url = 'mongodb://localhost:27017/';
const dbName = 'conFusion';

mongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log('Connected to the server proberlly');
    
    const db = client.db(dbName);
    const dishesCollection = db.collection('dishes');

    dishesCollection.insertOne({"name": "Uthappizza", "description":"A delecious dish"}, (err, result) => {
        assert.equal(err, null);
        
        console.log('After insertion : \n');
        console.log(result.ops);

        dishesCollection.find({}).toArray((err, docs) => {
            assert.equal(err, null);

            console.log('Data found from the server is : \n');
            console.log(docs);

            db.dropCollection('dishes', (err, result) => {
                assert.equal(err, null);

                client.close();
            });
        });
    });

});