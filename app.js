const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

// ./node_modules/.bin/nodemon

const connection = mysql.createConnection({
	host: "byzisrgxy8aldvqs2cmz-mysql.services.clever-cloud.com",
	user: "u4bqg33splxnstla",
	password: "xrqK79OhUMUCgj9QLKDk",
	database: "byzisrgxy8aldvqs2cmz",
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
		res.render("index.ejs", { items: results });
	});
});

app.post("/create", (req, res) => {
	connection.query(
		"INSERT INTO items (name) VALUES (?)",
		[req.body.itemName],
		(error, results) => {
			res.redirect("/index");
		}
	);
});

// :id => utk parameter id yg di kirim
app.post("/delete/:id", (req, res) => {
	// console.log(req.params.id);
	connection.query(
		"DELETE FROM items WHERE id = ?",
		[req.params.id],
		(error, results) => {
			res.redirect("/index");
		}
	);
});

// edit => menggunakan route parameter :id
app.get("/edit/:id", (req, res) => {
	connection.query(
		"SELECT * FROM items WHERE id = ?",
		[req.params.id],
		(error, results) => {
			console.log(results);
			// res.redirect("/index");
			res.render("edit.ejs", { item: results[0] });
		}
	);
});

// update => saat update bisa pake route parameter :id atau input id di editnya
// disini digunakan input id tipe hidden di editnya
app.post("/update", (req, res) => {
	const name = req.body.itemName;
	const id = req.body.itemId;
	connection.query(
		"UPDATE items SET name = ? WHERE items.id = ?",
		[name, id],
		(error, results) => {
			console.log("name : " + name + " id : " + id);
			res.redirect("/index");
		}
	);
});

// app.listen(port, () => {
// 	console.log(`Example app listening at http://localhost:${port}`);
// });

app.listen(process.env.PORT || 3000, function () {
	console.log(
		"Express server listening on port %d in %s mode",
		this.address().port,
		app.settings.env
	);
});
