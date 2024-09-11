const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const data = require("./data");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    category: String,
  })
);

app.get("/api/products/seed", async (req, res) => {
  const products = await Product.insertMany(data.products);
  res.send({ products });
});

app.get("/api/products", async (req, res) => {
  const { category } = req.query;
  const products = await Product.find(category ? { category } : {});
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.get("/api/categories", (req, res) => {
  res.send(data.Categories);
});

const Order = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      number: { type: Number, default: 0 },
      orderType: String,
      inProgress: { type: Boolean, default: true },
      isDeliverd: { type: Boolean, default: false },
      totalPrice: Number,
      orderItems: [
        {
          name: String,
          price: Number,
          quantity: Number,
          option1: String,
          option2: String,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

app.get("/api/orders", async (req, res) => {
  const orders = await Order.find({ isDeliverd: false });
  res.send(orders);
});

app.put("/api/orders/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDeliverd = true;
    order.inProgress = false;
    await order.save();
    res.send({ message: "Done" });
  } else {
    req.statusCode(404).message({ message: "Order not found" });
  }
});

app.post("/api/orders", async (req, res) => {
  const lastOrder = await Order.find().sort({ number: -1 }).limit(1);
  const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;
  if (
    !req.body.orderType ||
    !req.body.orderItems ||
    req.body.orderItems.length === 0
  ) {
    return res.send({ message: "Data is required." });
  }
  const order = await Order({ ...req.body, number: lastNumber + 1 }).save();
  res.send(order);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
