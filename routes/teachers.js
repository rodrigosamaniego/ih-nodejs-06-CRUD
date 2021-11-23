//./routes/teachers.js

// 1. IMPORTACIONES
const express = require("express")
const router = express.Router()


// 2. RUTAS

router.get("/:nombreTeacher/:tweetID/edit", (req, res) => {

	console.log(req.params)

	const nombreTeacher = req.params.nombreTeacher // => mike
	const tweetID		= req.params.tweetID // => 123456

	res.send(`Los datos que estás obteniendo son: ${nombreTeacher} y ${tweetID}`)
})

router.get("/", (req, res) => {
	res.send("Estás en el home de teachers")
})

// 3. EXPORTACIONES
module.exports = router