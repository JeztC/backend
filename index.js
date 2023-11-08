const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json());

app.use(cors())

let totalWins = 0;

app.get('/api/simonsays/', (request, response) => {
    response.json(totalWins)
})

app.put('/api/simonsays/reset', (req, res) => {
    totalWins = 0;
    res.status(200).json({ message: 'TotalWins reset to 0' });
});

app.put('/api/simonsays/', (req, res) => {
    totalWins++;
    res.status(200).json({ message: 'Win recorded', totalWins });
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
