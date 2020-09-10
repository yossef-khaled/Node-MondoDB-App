const assert = require('assert');

exports.insertDocument = (db, document, coll, callBack) => {
    const collection = db.collection(coll);
    collection.insert(document, (err, result) => {
        assert.equal(err, null);
        console.log(`Inserted ${result.result.n} document/s into the database collection ${coll}`);
        callBack(result);
    });
};

exports.findDocuments = (db, coll, callBack) => {
    const collection = db.collection(coll);
    collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        callBack(docs);
    });
};

exports.removeDocument = (db, document, coll, callBack) => {
    const collection = db.collection(coll);
    collection.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log(`Removed ${document} from the database collection ${coll}`)
    });
};

exports.updateDocument = (db, document, update, coll, callBack) => {
    const collection = db.collection(coll);
    collection.updateOne(document, {$set: update}, null, (err, result) => {
        assert.equal(err, null);
        console.log(`Updated the document ${document} with ${update}`);
        callBack(result);
    });
};