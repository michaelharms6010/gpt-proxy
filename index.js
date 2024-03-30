require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const morgan = require("morgan")
const port = 5050;
const axios = require("axios")

const server = express();

server.use(cors())
server.use(helmet())
server.use(morgan('dev'))
server.use(express.json())

server.get("/", (req,res) => res.status(200).json({message: "UP"}))
server.post("/get_post", async (req, res) => {
    try {


    console.log("getting joke...")
    const {prompt} = req.body
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [
            {
            role: "system",
            content: "You are a helpful assistant."
            },
            {
            role: "user",
            content: prompt
            }
        ]
        }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
    })

    const postText = response.data.choices[0]
    res.status(200).json({postText})
    }catch(e) {
        console.log(e)
    }
})

server.listen(port, _ => console.log(`\nListneing on port ${port}\n`))