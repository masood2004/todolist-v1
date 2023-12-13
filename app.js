const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];

const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    
    const day = date.getDate();

    res.render("list", { listTitle: day, userListItems: items })

});

app.post("/", function (req, res) {
    
    const item = req.body.userInput;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }



})

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", userListItems: workItems });
});

app.get("/about", function(req, res){
    res.render("about");
})

app.listen(3000, function () {
    console.log("Server is up and running on port 3000.");
})