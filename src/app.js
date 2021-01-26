import path from "path";
import express from "express";
import hbs from "hbs";
import { getForecast } from "../src/utils/getForecast.js";
import { getGeocode } from "../src/utils/getGeocode.js";

const app = express();
const port = 3000;

// to use __dirname with esm imports
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Static directory to serve
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Ibrahim",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Ibrahim",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  getGeocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      getForecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          res.send({ error });
        } else {
          res.send({
            forecast: forecastData,
            location: `${location} with latitude: ${latitude} and longitude: ${longitude}`,
            address: req.query.address,
          });
        }
      });
    }
  );
});

app.get("*", (req, res) => {
  res.send("404 page.");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
