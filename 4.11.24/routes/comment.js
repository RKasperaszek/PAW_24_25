const express = require('express');
const {PrismaClient} = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    const {name, content, postId} = req.body;
    try {
        const comment = await prisma.post.create({
            data: {name, content, postId}
        });
        res.status(200).send(comment);
    }catch(err){
        res.status(500).send(err.message);
    }
})

router.get('/', async (req, res) => {
    const posts = await prisma.comment.findMany()
    res.status(200).send(posts);
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const comment = await prisma.comment.findFirst({where: {id: Number(id)}});
    if (!comment) {
        res.status(404).send('Not found');
    }
    else{
        res.status(200).send(comment);
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {name, content, postId} = req.body;
    try{
        const post = await prisma.comment.update({
            where: {id: Number(id)},
            data: {name, content, postId}
        })
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        await prisma.comment.delete({where: {id: Number(id)}});
        res.status(200).send("deleted");
    }
    catch (err){
        res.status(500).send(err.message);
    }

})

module.exports = router;