import User from "../models/users.models.js";

export const getUsers = async (_, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users Fetched Successfully",
      //   data: users,
      data: users.map((user) => {
        return {
          name: user.name,
          email: user.email,
          id: user._id,
        };
      }),
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error("User Not Found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "User Fetched Sucessfully",
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};
