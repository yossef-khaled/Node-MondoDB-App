const mongoClient = require('mongodb').MongoClient;
const assert = require('assert'); 

const dbOperations = require('./Operations');

const url = 'mongodb://localhost:27017/';
const dbName = 'conFusion';

mongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log('Connected to the server proberlly');
    
    const db = client.db(dbName);

    dbOperations.insertDocument(db, {name: "First dish", description: "A dish"}, 'dishes', (result) => {});

    dbOperations.insertDocument(db, {name: "Pasta", description: "Dummy data for test"}, 'dishes', (result) => {
        console.log(`Inserted ${result.ops}`);
        dbOperations.findDocuments(db, 'dishes', (docs) => {
            console.log(`The collection of 'dishes' is ${docs}`);

            dbOperations.updateDocument(db, {name: "Pasta"}, {description: "Description after update 'NOT DUMMY'"}, 'dishes', (result) => {
                console.log(`Updated ${result.result}`);

                db.dropCollection('dishes', (result) => {
                    console.log('Dropped the data');
                    client.close();
                });
            });
        });
    });
});