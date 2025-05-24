// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// import { producer, consumer, connectKafka } from "./kafka";

// const app = express();

// const corsOptions = {
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true, // enable set cookie
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// // Microservices endpoints
// const services: Record<string, string> = {
//   profile: "http://localhost:4001",
//   property: "http://localhost:4000",
// };

// console.log("Registered services:", services);

// // API Gateway Routes
// app.all("/:service/*", async (req: {
//   [x: string]: any; params: { service: string; 0?: string; }; method: any; body: any; headers: any; originalUrl: string; 
// }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; details?: any; }): void; new(): any; }; }; json: (arg0: any) => void; }) => {
//   const service = req.params.service || req.originalUrl.split("/")[1] || "";
//   const path = req.params[0] || req.originalUrl.split("/").slice(2).join("/") || ""; // Capture the full path

//   console.log("Service:", service);
//   console.log("Path:", path);

//   if (!services[service]) {
//     return res.status(404).json({ error: "Service not found" });
//   }

//   try {
//     const url = `${services[service]}${path ? "/" + path : ""}`;
//     console.log(`Forwarding request to: ${url}`);

//     const response = await axios({
//       method: req.method,
//       url,
//       data: req.body,
//       params: req.query, // Ensure query parameters are forwarded
//       headers: {
//         "Content-Type": req.headers["content-type"] || "application/json",
//         Authorization: req.headers.authorization || "", // Ensure token forwarding
//       },

//     });
//     console.log("Received Headers:", req.headers);
//     console.log("Forwarding Authorization Header:", req.headers.authorization);


//     console.log("Response:", response.data);


//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({
//       error: "Service error",
//       details: (error as any).message,
//     });
//   }
// });

// // Kafka Event Producer
// app.post("/publish", async (req: { body: { topic: any; message: any; }; }, res: { json: (arg0: { status: string; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; details: any; }): void; new(): any; }; }; }) => {
//   const { topic, message } = req.body;

//   try {
//     await producer.send({
//       topic,
//       messages: [{ value: JSON.stringify(message) }],
//     });

//     res.json({ status: "Message sent to Kafka" });
//   } catch (error) {
//     console.error('Error sending message to Kafka:', error);
//     res.status(500).json({
//       error: "Kafka error",
//       details: (error as any).message,
//     });
//   }
// });

// // Root health check
// app.get("/", (req: any, res: { send: (arg0: string) => void; }) => {
//   res.send("API is working!");
// });

// // Start Server
// const PORT = process.env.PORT || 3003;
// connectKafka().then(() => {
//   app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
// });
