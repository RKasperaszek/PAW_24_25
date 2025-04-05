const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let posts = [
    { id: 1, title: "Pierwszy post", body: "Pierwszy post" },
    { id: 2, title: "Drugi post", body: "Drugi post" },
];

let comments = {
    1: [{ id: 1, text: "Totalnie." }],
    2: [],
};

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.get("/posts/:id", (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send("Not found");
    res.json({ ...post, comments: comments[post.id] || [] });
});

app.get("/posts/:id/comments", (req, res) => {
    const postId = parseInt(req.params.id);
    const postComments = comments[postId];
    if (!postComments) return res.status(404).send("Not found");
    res.json(postComments);
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
