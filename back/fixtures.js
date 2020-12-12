const mongoose = require('mongoose');
const config = require('./config');

const Category = require('./models/Category');
const Good = require('./models/Good');

const run = async () => {

    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [category1, category2, category3] = await Category.create({
        name: 'Category 1',
    }, {
        name: 'Category 2'
    }, {
        name: 'Category 3'
    });

    const [item1, item2, item3, item4, item5, item6] = await Good.create(
        {
            name: "Очень красивая лампа",
            price: 1100,
            quantity: 5,
            category: category1,
        },
        {
            name: "Люстра шикос!",
            price: 1200,
            quantity: 2,
            category: category2,
        },
        {
            name: "А это как тарелка перевернутая",
            price: 700,
            quantity: 1,
            category: category3,
        },
        {
            name: "красивая лампа",
            price: 1100,
            quantity: 5,
            category: category1,
        },
        {
            name: "Люстра!",
            price: 1200,
            quantity: 2,
            category: category2,
        },
        {
            name: "А это перевернутая",
            price: 700,
            quantity: 1,
            category: category3,
        }
    );
    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});