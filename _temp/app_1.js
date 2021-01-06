const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "729729",
	database: "nodejs",
});

app.get("/", (req, res) => {
	res.render("top.ejs");
});

app.get("/hello", (req, res) => {
	res.render("hello.ejs");
});

app.get("/new", (req, res) => {
	res.render("new.ejs");
});

app.get("/index", (req, res) => {
	connection.query("SELECT * FROM items", (error, results) => {
		// console.log(results);
		res.render("index.ejs", { items: results });
	});
});

app.post("/create", (req, res) => {
	// console.log(req.body.namaItem);
	connection.query(
		"INSERT INTO items (name) VALUES (?)",
		[req.body.itemName], // masuk ke tanda tanya
		(error, results) => {
			res.redirect("/index");
		}
	);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
