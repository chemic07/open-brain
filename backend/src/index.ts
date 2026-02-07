import connectdb from "./config/db";
import app from "./app";

const PORT: number = Number(process.env.PORT!);

await connectdb();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on ${PORT}`);
});
