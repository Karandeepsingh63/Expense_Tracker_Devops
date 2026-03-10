require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const path=require("path");
const incomeRoutes=require("./routes/incomeRoutes");
const expenseRoutes=require("./routes/expenseRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*", // fixed typo
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


// Connect DB
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/income", incomeRoutes);


app.use("/api/v1/expense",expenseRoutes)

app.use("/api/v1/dashboard",dashboardRoutes);
// server upload folder

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
