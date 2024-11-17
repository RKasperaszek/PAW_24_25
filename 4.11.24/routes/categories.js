const express = require('express');
const {PrismaClient} = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    const {name} = req.body;
    try {
        const category = await prisma.category.create({
            data: {name}
        });
        res.status(200).send(category);
    }catch(err){
        res.status(500).send(err.message);
    }
})

router.get('/', async (req, res) => {
    const category = await prisma.category.findMany()
    res.status(200).send(category);
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const category = await prisma.category.findFirst({where: {id: Number(id)}});
    if (!category) {
        res.status(404).send('Not found');
    }
    else{
        res.status(200).send(category);
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    try{
        const category = await prisma.category.update({
            where: {id: Number(id)},
            data: {name}
        })
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        await prisma.category.delete({where: {id: Number(id)}});
        res.status(200).send("deleted");
    }
    catch (err){
        res.status(500).send(err.message);
    }

})

module.exports = router;