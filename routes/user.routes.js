import { Router } from "express";
import { getSingleUser, getUsers } from "../controller/user.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const userRouter = Router();

// userRouter.get("/", (req, res) => {
//   return res.send({ title: "All Users" });
// });

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getSingleUser);

userRouter.post("/", (req, res) => {
  return res.send({ title: "Create User" });
});

userRouter.put("/:id", (req, res) => {
  return res.send({ title: "Update User" });
});

userRouter.delete("/:id", (req, res) => {
  return res.send({ title: "Delete User" });
});

export default userRouter;
