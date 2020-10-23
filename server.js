const express = require(`express`);
const mongoose = require(`mongoose`);
const routes = require(`./routes`);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === `production`) {
  app.use(express.static(`client/build`));
}

app.use(routes);

const CONNECTION_STRING = `mongodb+srv://heroku_555t5v8l:roc9o2kc09tdrd3gh27r3iisc@cluster-555t5v8l.qkck0.mongodb.net/heroku_555t5v8l?retryWrites=true&w=majority`;



mongoose.connect(process.env.MONGO_CONNECTION || `mongodb://localhost/googlebooks`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

app.listen(PORT, () =>
  console.log(`API Server up on http://localhost:${PORT}`)
);
