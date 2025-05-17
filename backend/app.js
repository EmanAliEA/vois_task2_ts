import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.get("/events", async (req, res) => {
  const eventsFileContent = await fs.readFile("./data/events.json");
  let events = JSON.parse(eventsFileContent);

  res.json({
    events: events.map((event) => ({
      id: event.id,
      title: event.title,
      image: event.image,
      date: event.date,
      content: event.content,
      tags: event.tags,
      author: event.author,
    })),
  });
});

app.get("/events/:id", async (req, res) => {
  const { id } = req.params;
  const eventsFileContent = await fs.readFile("./data/events.json");
  const events = JSON.parse(eventsFileContent);
  const event = events.find((event) => Number(event.id) === Number(id)); // Ensure id is treated as a string

  if (!event) {
    return res.status(404).json({
      message: `For the id ${id}, no event could be found.`,
    });
  }

  res.json({ event });
});

app.post("/events", async (req, res) => {
  const { event } = req.body;
  if (!event) {
    return res.status(400).json({ message: "Event is required" });
  }

  if (!event.title?.trim() || !event.content?.trim() || !event.author?.trim()) {
    return res.status(400).json({ message: "Invalid data provided." });
  }

  const eventsFileContent = await fs.readFile("./data/events.json");
  const events = JSON.parse(eventsFileContent);

  const newEvent = {
    id: Math.round(Math.random() * 10000).toString(),
    ...event,
  };

  events.push(newEvent);

  await fs.writeFile("./data/events.json", JSON.stringify(events));

  res.json({ event: newEvent });
});

app.put("/events/:id", async (req, res) => {
  const { id } = req.params;
  const { event } = req.body;

  if (!event) {
    return res.status(400).json({ message: "Event is required" });
  }

  if (
    !event.title?.trim() ||
    !event.author?.trim() ||
    !event.date?.trim() ||
    !event.image?.trim() ||
    !event.content?.trim() ||
    !event.tags
  ) {
    return res.status(400).json({ message: "Invalid data provided." });
  }

  const eventsFileContent = await fs.readFile("./data/events.json");
  const events = JSON.parse(eventsFileContent);

  const eventIndex = events.findIndex((event) => +event.id === +id);

  if (eventIndex === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  events[eventIndex] = {
    id,
    ...event,
  };

  await fs.writeFile("./data/events.json", JSON.stringify(events));

  res.json({ event: events[eventIndex] });
});

app.delete("/events/:id", async (req, res) => {
  const { id } = req.params;

  const eventsFileContent = await fs.readFile("./data/events.json");
  const events = JSON.parse(eventsFileContent);

  const eventIndex = events.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  events.splice(eventIndex, 1);

  await fs.writeFile("./data/events.json", JSON.stringify(events));

  res.json({ message: "Event deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
