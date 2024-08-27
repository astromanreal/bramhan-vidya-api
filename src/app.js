const express = require("express");
const cors = require("cors");
const compression = require("compression");
const routes = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  compression({
    threshold: 10240,
    level: 6,
    memLevel: 9,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>The Bramhan Vidya is Live now!</h1>");
});

app.use("/profiles", routes.profiles);
app.use("/users", routes.users);
app.use("/places", routes.places);
app.use("/topics", routes.topics);
app.use("/community", routes.community);
app.use("/books", routes.books);
app.use("/tech", routes.tech);
app.use("/event", routes.events);
app.use("/blogs", routes.blogs);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: "Internal Server Error" });
});

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
