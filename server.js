import express from "express";
import cors from "cors";
import users from "./data/user.json" assert { type: "json" };

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));

const generateRandom = () => {
  const name = users.map((user) => user.name);
  const email = users.map((user) => user.email);
  const address = users.map((user) => user.address);

  const randomName = name[Math.floor(Math.random() * name.length)];
  const randomEmail = email[Math.floor(Math.random() * email.length)];
  const randomAddress = address[Math.floor(Math.random() * address.length)];

  return {
    randomName,
    randomEmail,
    randomAddress,
  };
};

app.get("/api/random", (req, res, next) => {
  const randomData = generateRandom();
  try {
    res.status(200).send(randomData);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
