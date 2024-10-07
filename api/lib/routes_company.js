const express = require('express');
const Company = require('./models/company');
const mongoose = require('mongoose');

const authorization = require('./authorization');

const router = express.Router();

// // Create a new company
router.post('/company', async (req, res) => {
  const { name, legal_name, cnpj, imp_disc_rate } = req.body;

  try {
    const company = new Company({ _id: new mongoose.Types.ObjectId(), name, legal_name, cnpj, imp_disc_rate });
    await company.save();
    res.send(company);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get all companies
router.get('/company', authorization.check, async (req, res) => {
  try {
    const company = await Company.find();
    res.send(company);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//CNPj
router.get('/company/cnpj/:cnpj', authorization.check, async (req, res) => {
  const cnpj = req.params.cnpj;
  console.log("company");
  try {
    const company = await Company.find({cnpj: cnpj});
    res.send(company);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update a company
router.put('/company/:id', async (req, res) => {
  const { id } = req.params;
  const { name, legal_name, cnpj, imp_disc_rate, entries } = req.body;

  try {
    const company = await Company.findByIdAndUpdate(id, { name, legal_name, cnpj, imp_disc_rate, entries }, { new: true });
    res.send(company);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


router.post('/company/entry/:company_id', async (req, res) => {
  const { company_id } = req.params;
  const { year, addition, withdraw } = req.body;

  try {
    const company = await Company.findById(company_id);
    company.entry.push({ year, addition, withdraw });
    await company.save();
    res.send(company);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a company
router.delete('/company/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findByIdAndDelete(id);
    res.send(company);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;