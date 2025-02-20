import app from "./app.mjs";

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server start: http://localhost:${port}`);
});