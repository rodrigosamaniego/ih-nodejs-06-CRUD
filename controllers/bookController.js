// ./controllers/bookController.js
const Book 		= require("./../models/Book")

exports.getAllBooks = async (req, res) => {
	
	const allBooks = await Book.find({})

	console.log(allBooks)

	res.render("books/list", {
		data: allBooks
	})
}

exports.getBook = async (req, res) => {

	const singleBookID = req.params.bookID

	const getTheBook = await Book.findById(singleBookID)

	console.log(getTheBook)

	res.render("books/single", {
		data: getTheBook
	})
}

exports.viewCreateBook = async (req, res) => {

	res.render("books/create")

}

exports.createBook = async (req, res) => {

	console.log(req.body)

	const title = req.body.title
	const author = req.body.author
	const description = req.body.description
	const rating = req.body.rating

	const newBookCreated = await Book.create({title, author, description, rating})

	console.log(newBookCreated)

	res.redirect("/books")

	console.log("Datos recibidos")


}

exports.viewEditBook = async (req, res) => {

	console.log(req.params)

	const bookID = req.params.bookID

	const foundBook = await Book.findById(bookID)

	res.render("books/edit", {
		data: foundBook
	})

}

exports.editBook = async (req, res) => {

	// 1. EL ID DEL LIBRO
	const bookID = req.params.bookID

	// 2. LOS NUEVOS CAMBIOS DEL FORMULARIO
	const title = req.body.title
	const description = req.body.description
	const author = req.body.author
	const rating = req.body.rating
	
	console.log(bookID)
	console.log(title, description, author, rating)

	// 3. REALIZAR LA ACTUALIZACIÓN DE DATOS EN LA BASE DE DATOS
	// findByIdAndUpdate([ID], [NUEVOS CAMBIOS EN OBJETO], [DEVOLVER A LA VARIABLE LA ACTUALIZACIÓN])
	const updatedBook = await Book.findByIdAndUpdate(
		bookID, // ID DEL DOCUMENTO
		{title, description, author, rating},
		{new: true} // DEVOLVER A LA VARIABLE EL DOCUMENTO ACTUALIZADO
	)

	console.log(updatedBook)

	res.redirect(`/books/${updatedBook._id}`)

}

exports.deleteBook = async (req, res) => {

	// 1. IDENTIFICAR EL LIBRO QUE QUIERO BORRAR
	const bookID = req.params.bookID

	// 2. REALIZAMOS BORRADO EN BASE DE DATOS
	const deletedBook = await Book.findByIdAndDelete(bookID)

	console.log("Borrado de libro:", deletedBook)

	// 3. REDIRECCIÓN
	res.redirect("/books")



}