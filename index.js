const express = require('express')
const path = require('path')
const csv = require('csvtojson')
const PORT = process.env.PORT || 5000


const fish = async (req, res) => {
    console.log("fish")

    const csvFilePath = "data/AnimalCrossingCritternariumFish.csv";
    const jsonArray = await csv().fromFile(csvFilePath);

    res.json(jsonArray);
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
    .get('/fish', fish)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
