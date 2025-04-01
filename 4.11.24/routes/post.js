const express = require('express');
const {PrismaClient} = require('@prisma/client');
const url = new URL("https://jsonplaceholder.typicode.com/posts");
const router = express.Router();
const prisma = new PrismaClient();


router.post("/", async (req, res) => {
    // zadanie 13.11
    const {title, content, authorId, categoryId} = req.body;
    try {
        // 13.11
        const post = await prisma.post.create({
            data: {title, content, authorId, categoryId}
        });
        res.status(200).send(post);
    }catch(err){
        res.status(500).send(err.message);
    }
})

router.get('/', async (req, res) => {

    try {
        // 18.12
        const response = await fetch(url);
        const data = await response.json();
        res.render('posts', {data, title: 'Posts'});


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const appendUrl = new URL(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const post = await fetch(appendUrl);
            if (post == null) {
                return res.status(404).render('notfound', { message: 'Post not found' });
            }
            const data = await post.json();

            const userURL = new URL(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
            const user = await fetch(userURL);
            const userData = await user.json();

            const commentURL = new URL(`https://jsonplaceholder.typicode.com/comments/?postId=${data.postId}`);
            const comment = await fetch(commentURL);
            const commentData = await comment.json();

            res.render('post', {userData,data});

        } catch (err) {
            res.status(500).json({ error: err.message });
        }

})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {title, content, authorId, categoryId} = req.body;
    try{
        // 13.11
        const post = await prisma.post.update({
            where: {id: Number(id)},
            data: {title, content, authorId, categoryId}
        })
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        // 13.11
        await prisma.post.delete({where: {id: Number(id)}});
        res.status(200).send("deleted");
    }
    catch (err){
        res.status(500).send(err.message);
    }

})

module.exports = router;