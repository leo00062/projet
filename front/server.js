const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const { fetchData } = require("./public/assets/js/lib/function.js");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public"))); // => /front/public

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

const images = fetchData({
  api: "https://api.unsplash.com",
  route: "/photos",
  options: {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_CLIENT_ID}`,
    },
    params: { per_page: 50 },
  },
}).then((data) => {
  return data;
});

app.get("/galerie", async (req, res) => {
  try {
    const imagesData = await images;
    console.log(imagesData);
    res.render("pages/masonry", { images: imagesData });
  } catch (err) {
    console.log(err);
    res.render("pages/masonry", { images: [] });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
