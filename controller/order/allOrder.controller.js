const orderModel = require("../../models/orderProductModel");
const userModel = require("../../models/userModel");

const allOrderController = async (request, response) => {
  try {
    const userId = request.userId;

    const user = await userModel.findById(userId);

    if (user.role !== 'ADMIN') {
      return response.status(403).json({
        message: "Not authorized to access this resource",
      });
    }

    // Fetch all users
    const users = await userModel.find();

    // Fetch the most recent order date for each user
    const usersWithRecentOrder = await Promise.all(users.map(async (user) => {
      const recentOrder = await orderModel.findOne({ userId: user._id }).sort({ createdAt: -1 });
      return {
        user,
        recentOrderDate: recentOrder ? recentOrder.createdAt : null,
      };
    }));

    // Sort users by the most recent order date
    usersWithRecentOrder.sort((a, b) => {
      if (!a.recentOrderDate) return 1;
      if (!b.recentOrderDate) return -1;
      return new Date(b.recentOrderDate) - new Date(a.recentOrderDate);
    });

    // Fetch orders for each user in sorted order
    const allOrders = [];
    for (const userWithRecentOrder of usersWithRecentOrder) {
      const userOrders = await orderModel.find({ userId: userWithRecentOrder.user._id }).sort({ createdAt: -1 });
      allOrders.push({
        user: userWithRecentOrder.user,
        orders: userOrders,
      });
    }

    return response.status(200).json({
      data: allOrders,
      success: true,
    });

  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = allOrderController;
