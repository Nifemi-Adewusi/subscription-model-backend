import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import {
  createSubscription,
  deleteSubscription,
  getAllUserSubscriptions,
  getUserSubscription,
} from "../controller/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get(
  "/all-subscriptions",
  authorize,
  getAllUserSubscriptions,
);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "Update  user subscription" }),
);

subscriptionRouter.delete("/:id", authorize, deleteSubscription);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscription);

subscriptionRouter.post("/:id", (req, res) =>
  res.send({ title: "Create specific user" }),
);

export default subscriptionRouter;
