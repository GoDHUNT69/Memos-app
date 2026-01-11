require("dotenv").config();
const cors = require("cors")
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

const connectDB = require("./src/config/dbConnection");
const errorHandler = require("./src/middleware/errorhandler");

// Connect to MongoDB
connectDB();

const app = express();

//enabling CORS
app.use(cors());

// Parse incoming JSON
app.use(express.json());

// Routes
app.use("/api/v1/users", require("./src/routes/userRoutes"));
app.use("/api/v1/memos", require("./src/routes/memoRoutes"));
app.use("/api/v1/admin", require("./src/routes/adminRoutes"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler (MUST be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
