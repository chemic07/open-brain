import connectdb from "./config/db";
import app from "./app";

const PORT: number = Number(Bun.env.PORT!);

await connectdb();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
