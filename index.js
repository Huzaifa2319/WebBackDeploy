const express = require("express");
var mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

const MONGODB_URL = process.env.URL;
const port = process.env.PORT;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const StudentRoutes = require("./Routes/Student");
app.use(StudentRoutes);

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.post("/FeePayment", async (req, res) => {
  const { id, semester, amount } = req.body.fee;
  console.log(id, semester, amount);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "pkr",
            product_data: {
              name: semester,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/Login",
    });
    res.json({ success: true, url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
