const express = require("express");
const SSE = require("express-sse");
const cors = require("cors");
const ElevatorController = require("./elevator-controller");

const port = 8080;
const app = express();
const sse = new SSE();
const elevatorController = new ElevatorController(3, 10);
elevatorController.start();

app.use(cors());
app.use(express.json());

elevatorController.on("move", (evt) => {
  sse.send(evt);
});

app.get("/ping", (req, res) => res.send("pong"));

app.get("/building", (req, res) => res.send(elevatorController.building));

app.put("/floor/:number", (req, res) => {
  const elevator = elevatorController.callElevator(
    Number.parseInt(req.params.number)
  );
  res.send(elevator);
});

app.get("/elevators", (req, res) => {
  res.send(elevatorController.elevators);
});
/* https://github.com/dpskvn/express-sse/pull/38 */
app.get("/stream", (_,res,next)=>{ res.flush = () => undefined; next() }, sse.init);

app.use("/", (req, res) => {
  res.status(404).send({ error: "Resource not found" });
});

app.listen(port, () =>
  console.log(`Elevator backend listening at http://localhost:${port}`)
);
