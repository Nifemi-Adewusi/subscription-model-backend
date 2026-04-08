import Subscription from "../models/subscriptions.models.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getAllUserSubscriptions = async (_, res, next) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({
      success: true,
      message: "User subscriptions fetched successfully",
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscription = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this subscription");
      error.statusCode = 401;
      throw error;
    }
    const subscription = await Subscription.find({ user: req.params.id });
    res.status(200).json({
      success: true,
      message: "User subscription fetched successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};
