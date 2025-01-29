import app from "./app";
import route from "./routes";
import  "./services/CheckingJOb";
const PORT = process.env.PORT ?? 3000;

app.use("/api/v1",route)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
