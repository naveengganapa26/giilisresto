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

    // Validate postal code
    if (!postalCode) {
      return res.status(400).json({
        success: false,
        message: "Postal code is required"
      });
    }

    // Ensure proper format for postal code query
    const formattedPostalCode = postalCode.trim();

    // Query to find restaurants by postal code
    const restaurants = await Restaurant.find({ 
      postalCode: formattedPostalCode 
    }).select('-__v'); // Exclude the version key

    // Handle case when no restaurants are found
    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No restaurants found for postal code: ${formattedPostalCode}`
      });
    }

    // Return successful response with restaurants
    return res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants
    });

  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching restaurants:', error);

    // Return error response
    return res.status(500).json({
      success: false,
      message: "Error fetching restaurants",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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
