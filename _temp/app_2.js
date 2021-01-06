/* Sebelum gunain library/framework kita harus require dulu*/
const express = require("express");
const app = express();
const port = 3000;

/*require mysql untuk menghubungkannya*/
const mysql = require("mysql");

/*Spesfikasikan dimana file css dan img diletakkan*/
app.use(express.static("public"));

/*Definisikan constant connection dan isikan dengan code informasi koneksi */
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "729729",
	database: "nodejs",
});

/* req => request, res => respond */
/* Untuk setiap request ke / akan menampilkan halaman hello.ejs */
app.get("/", (req, res) => {
	res.render("top.ejs"); /* Memanggil file .ejs di /views */
});

app.get("/hello", (req, res) => {
	res.render("hello.ejs");
});

app.get("/index", (req, res) => {
	// query dan menjalankannya
	connection.query("SELECT * FROM items", (error, results) => {
		console.log(results);
		res.render("index.ejs");
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
// app.listen(3000);

// array di ejs
// <% const items = [
//           {id: 1, name: 'kentang'},
//           {id: 2, name: 'wortel'},
//           {id: 3, name: 'bawang'},
//           {id: 4, name: 'tomat'}
//         ]; %>
