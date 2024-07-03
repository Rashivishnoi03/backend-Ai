const express = require("express");
const cookieParser = require("cookie-parser");
const UserRouter = require("./Routes/UserRouter");
const historyRouter = require("./Routes/HistoryRoute");
const cors = require("cors");
const app = express();

app.use(cookieParser());
app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// const corsOptions = {
//   origin: "https://image-generator-frontend-ten.vercel.app",
//   credentials: true,
// };
// // Enable CORS pre-flight across all routes
// app.options("*", cors(corsOptions));
// // Enable CORS for all routes
// app.use(cors(corsOptions));

// const corsOptions = {
//   origin: "https://image-generator-frontend-ten.vercel.app",
//   credentials: true,
// };
// // Enable CORS pre-flight across all routes
// app.options("*", cors(corsOptions));
// // Enable CORS for all routes
// app.use(cors(corsOptions));

// Configure CORS options
const corsOptions = {
  origin: "http://localhost:3000",
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies
};

app.use(cors(corsOptions));

app.use("/api/v1", UserRouter);
app.use("/api/v1", historyRouter);

module.exports = app;
