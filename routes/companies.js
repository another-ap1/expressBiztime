const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res, next) => {
    "return all companies"
    try {
        const result = await db.query(`SELECT * FROM companies`);
        return res.json({ companies: result.rows });
    } catch(err){
        return next(err);
    }
})

router.get('/:code', async (req, res, next) => {
    "Return a single company by code"
    try {
        console.log(req.params)
        const { code } = req.params;
        const results = await db.query(`SELECT * FROM companies WHERE code=$1`, [code]);
        if(results.rows.length === 0) {
            throw new ExpressError(`Companie does not exist with code ${code}`, 404)
        }
        return res.send({ company: results.rows[0] });
    } catch(err){
        return next(err);
    }
})

router.post('/', async (req, res, next) => {
    try{
        console.log(req.body)
        const { code, name, description  } = req.body;
        const results = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`, [ code, name, description ]);
        return res.status(201).json({ "company": results.rows[0]});
    } catch(err){
        return next(err);
    }
})

router.put('/:code', async (req, res, next) => {
    try{
        let {code, name, description} = req.body;

        const result = await db.query(`UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description`, [name, description, code]);
        
        if (result.rows.length === 0) {
            throw new ExpressError(`${code} company doesnt exist`, 404)
        } else {
            return res.json({"company": result.row[0]});
        }
    }catch(err){
        return next(err);
    }
})

router.delete('/:code', async (req, res, next) => {
    try{
        let {code} = req.params;

        const result = await db.query(`DELETE FROM companies WHERE code=$1 RETURNING code`, [code]);

        if (result.rows.length === 0) {
            throw new ExpressError(`${code} company doesnt exist`, 404);
        } else {
            return res.json({"status": "deleted"})
        }
    } catch(err){
        return next(err);
    }
})

module.exports = router;