const express = require('express');

const Category = require('../models/Category');



const router = express.Router();

router.get('/', async (req, res) => {

    const category = await Category.find().sort({"name": 1});

    return res.send(category);
});

module.exports = router;