const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//create, find, update, delete
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/additem', userController.form);
router.post('/additem', userController.create);
router.get('/edititem/:id', userController.edit);
router.post('/edititem/:id', userController.update);

router.get('/viewitem/:id', userController.viewall);
router.get('/positem', userController.items);
router.get('/invitem', userController.invitems);

router.get('/orderitem/:id', userController.edit);
router.post('/orderitem/:id', userController.order);

//Customer
router.get('/customerlist', userController.customerget);
router.get('/viewcust/:id', userController.viewcust);
router.get('/editcust/:id', userController.editcust);
router.post('/editcust/:id', userController.updatecustomer);

router.get('/addcust', userController.get_cust);
router.post('/addcust', userController.create_cust);

module.exports = router;