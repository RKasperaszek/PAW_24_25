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
        res.render('categories', {title: 'categories', message: null});
    }catch(err){
        res.status(500).send(err.message);
    }
})

router.get('/', async (req, res) => {
    const category = await prisma.category.findMany()
    res.render('categories', {title: 'categories', message: null});
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const category = await prisma.category.findFirst({where: {id: Number(id)}});
    if (!category) {
        return res.status(404).render('notfound', { message: 'Category not found' });
    }
    else{
        res.render('categories', {title: 'categories', message: null});
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
        return res.render('categories', { message: 'deleted', title: 'Categories' });
    }
    catch (err){
        res.status(500).send(err.message);
    }

})

module.exports = router;