const express = require('express');
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantsByPostalCode,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurantController');
const validateRestaurant = require('../middleware/validateRestaurant');

router.get('/', getAllRestaurants);
router.get('/:postalCode', getRestaurantsByPostalCode);
router.post('/', validateRestaurant, createRestaurant);
router.put('/:id', validateRestaurant, updateRestaurant);
router.delete('/:id', deleteRestaurant);

module.exports = router;