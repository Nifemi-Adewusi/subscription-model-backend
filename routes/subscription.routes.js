import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/all-subscription", (req, res) =>
  res.send({ title: "Get All user subscription" }),
);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "Update  user subscription" }),
);

subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "Delete user subscription" }),
);

subscriptionRouter.post("/", (req, res) =>
  res.send({ title: "Create user subscription" }),
);

subscriptionRouter.post("/:id", (req, res) =>
  res.send({ title: "Create specific user" }),
);

export default subscriptionRouter;
