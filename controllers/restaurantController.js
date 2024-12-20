const Restaurant = require("../models/Restaurant");

exports.getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    next(error);
  }
};

// exports.getRestaurantById = async (req, res, next) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id);
//     if (!restaurant) {
//       return res.status(404).json({ message: 'Restaurant not found' });
//     }
//     res.status(200).json(restaurant);
//   } catch (error) {
//     next(error);
//   }
// };

exports.getRestaurantsByPostalCode = async (req, res, next) => {
  try {
    const { postalCode } = req.query;

    if (!postalCode) {
      return res.status(400).json({ message: "Postal code is required" });
    }
    const restaurants = await Restaurant.find({ postalCode });
    if (!restaurants || restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: "No restaurants found for the given postal code" });
    }
    res.status(200).json(restaurants);
  } catch (error) {
    next(error);
  }
};

exports.createRestaurant = async (req, res, next) => {
  try {
    const restaurant = new Restaurant(req.body);
    const savedRestaurant = await restaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    next(error);
  }
};

exports.updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
};

exports.deleteRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
