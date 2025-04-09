const express = require("express");
const helmet = require("helmet");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
require("dotenv").config();
const { fetchData } = require("./public/assets/js/lib/function.js");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public"))); // => /front/public

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com/",
          "https://cdnjs.cloudflare.com/",
        ],
        styleSrcElem: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com/",
          "https://cdnjs.cloudflare.com/",
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com/",
          "https://cdnjs.cloudflare.com/",
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https://images.unsplash.com/",
          "https://media.rawg.io/",
        ],
        connectSrc: [
          "'self'",
          "https://api.unsplash.com/",
          "https://api.rawg.io/",
        ],
      },
    },
  })
);

app.use(express.json());

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

// envoie messages
app.post("/contact", async (req, res) => {
  console.log(req.body);
  const { name, email, message, subject } = req.body;
  const htmlContent = `
  <h1>Nouveau message de contact</h1>
  <p><strong>Sujet :</strong> ${subject}</p>
  <p><strong>Nom :</strong> ${name}</p>
  <p><strong>Email :</strong> ${email}</p>
  <p><strong>Message :</strong> ${message}</p>
  `;

  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure, // port 465
      auth: {
        user: testAccount.user, // contact@monsiteweb.fr
        pass: testAccount.pass,
      },
      tls: {
        rejectUnauthorized: false, // authorise tout
      },
    });

    let mailOptions = {
      from: `"Contact mon site web" <${email}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: subject,
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOptions);

    // récuperation de l'url de la boite de messagerie locale
    console.log("Message envoyé : %s", info.messageId);
    console.log(
      "URL de prévisualisation : %s",
      nodemailer.getTestMessageUrl(info)
    );

    res.status(200).json({
      message: "Votre message à été envoyé avec succès",
      previewUrl: nodemailer.getTestMessageUrl(info),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Erreur lors de l'envoie du mail",
    });
  }
});
