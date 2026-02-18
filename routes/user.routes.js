import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  return res.send({ title: "All Users" });
});

userRouter.get("/:id", (req, res) => {
  return res.send({ title: "Get Specific User (ID)" });
});

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
