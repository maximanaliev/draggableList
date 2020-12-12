const express = require('express');

const upload = require('../multer').uploads;

const router = express.Router();

const Good = require('../models/Good');
const Category = require('../models/Category');

router.get('/', async (req, res) => {
    try {
        if (req.query.category) {
            const category = await Category.findOne({name: req.query.category});
            const items = await Good.find({category: category._id}).sort({"date": -1}).populate('category');
            res.send(items);
        } else {
            const items = await Good.find().sort({"date": -1}).populate('category');
            return res.send(items);
        }
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/', upload.single('image'), async (req, res) => {

    try {
        const goodData = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category
        };

        if (req.body.category) {
            const category = await Category.find({name: req.body.category});
            goodData.category = category[0]._id;
        }

        if (req.file) {
            goodData.image = req.file.filename;
        }

        const good = new Good(goodData);

        await good.save();
        return res.send(good);

    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Good.deleteOne({_id: req.params.id});
        return res.send("Deleted");
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;