const express = require('express')
const path = require('path')
const csv = require('csvtojson')
const PORT = process.env.PORT || 5000


const loadCsvAsJson = async (csvFilePath) => {
    const jsonArray = await csv().fromFile(csvFilePath);
    return jsonArray;
};


const fish = async (req, res) => {
    const csvFilePath = "data/AnimalCrossingCritternariumFish.csv";
    const jsonArray = await loadCsvAsJson(csvFilePath);

    res.json(jsonArray);
};

const bugs = async (req, res) => {
    const csvFilePath = "data/AnimalCrossingCritternariumBugs.csv";
    const jsonArray = await loadCsvAsJson(csvFilePath);

    res.json(jsonArray);
};

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/api/v1/fish', fish)
    .get('/api/v1/bugs', bugs)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
