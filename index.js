const express = require("express");
const swaggerDocs = require("./utils/swagger.js");
const swaggerUi = require("swagger-ui-express");
const bookRoutes = require("./routes/book.js");
const memberRoutes = require("./routes/member.js");
const borrowRoutes = require("./routes/borrow.js");
const sequelize = require("./config/database.js");

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/books", bookRoutes);
app.use("/members", memberRoutes);
app.use("/borrows", borrowRoutes);

app.listen(3000, () => console.log("Server is running on port 3000"));

// sequelize.sync({force:true}).then(() => {
//     console.log('Database synced');
// }).catch((err) => {
//     console.log('Error: ' + err);
// })
