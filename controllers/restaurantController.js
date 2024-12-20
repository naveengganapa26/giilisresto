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
    // Use find() instead of findById() to search by postal code
    const restaurants = await Restaurant.find({ 
      postalCode: req.params.postalCode 
    }).select({
      name: 1,
      offerPercentage: 1,
      address: 1,
      city: 1,
      postalCode: 1,
      imageUrl: 1,
      rating: 1,
      _id: 0  // Exclude the _id field from the response
    });

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'No restaurants found for this postal code' 
      });
    }

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants
    });
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
