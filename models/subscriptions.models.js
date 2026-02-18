import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    subscriptionName: {
      type: String,
      trim: true,
      required: [true, "Subscription Name Is Required"],
      minLength: 3,
      maxLength: 30,
    },
    price: {
      type: Number,
      required: [true, "Price Is Required"],
      min: [0, "Price Must Be Greater Than 0"],
    },
    currency: {
      type: String,
      required: [true, "Currency Is Required"],
      enum: ["NGN", "USD", "EUR"],
    },
    duration: {
      type: Number,
      required: [true, "Duration Is Required"],
      min: [1, "Duration Must Be Greater Than 0"],
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: ["food", "transportation", "entertainment", "utilities", "other"],
      default: "other",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= Date.now(),
        message: "Start Date Must Be In The Past",
      },
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          // This keyword refers to the object calling the method
          return value > this.startDate;
        },
        message: "Renewal Date Must Be Greater Than Start Date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// Auto calculate renewal date if missing

subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency],
    );
    // next();
  }
  //   Auto Generate the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
});

const subscription = mongoose.model("Subscription", subscriptionSchema);

export default subscription;
