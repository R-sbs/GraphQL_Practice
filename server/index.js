import express from "express";
import AppSchema from "./schema/schema.js";
import { NODE_ENV, PORT } from "./config/dotenv.js";
import { graphqlHTTP } from "express-graphql";
import  connectDB  from "./config/connectDB.js";
import chalk from 'chalk'

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('API is Healthy')
})

app.use(
  "/graphql",
  graphqlHTTP({
    schema: AppSchema,
    graphiql: NODE_ENV === "development",
  })
);

app.listen(PORT, async () => {
    console.log('Connecting to DB...');
  await connectDB();
  console.log(`Server is running on ${PORT}...`);
  const url = `http://localhost:${PORT}`;
  console.log(chalk.green.underline(`${url}`));

});
