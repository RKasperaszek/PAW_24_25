const express = require('express');
const {PrismaClient} = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    const {title, content, authorId, categoryId} = req.body;
    try {
        const post = await prisma.post.create({
            data: {title, content, authorId, categoryId}
        });
        res.status(200).send(post);
    }catch(err){
        res.status(500).send(err.message);
    }
})

router.get('/', async (req, res) => {
    const posts = await prisma.post.findMany()
    res.status(200).send(posts);
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const post = await prisma.post.findFirst({where: {id: Number(id)}});
    if (!post) {
        res.status(404).send('Not found');
    }
    else{
        res.status(200).send(post);
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {title, content, authorId, categoryId} = req.body;
    try{
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
        await prisma.post.delete({where: {id: Number(id)}});
        res.status(200).send("deleted");
    }
    catch (err){
        res.status(500).send(err.message);
    }

})

module.exports = router;