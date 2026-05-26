import express from "express";
import fetch from "node-fetch";
import fs from "fs";

const app = express();

const countryMap = new Map();

(() => {
  const rawData = fs.readFileSync("countries.geojson", "utf8");
  const json = JSON.parse(rawData);
  json.features.forEach((feature) => {
    countryMap.set(feature.properties["ISO3166-1-Alpha-2"], feature);
  });
})();

app.get("/api/streetview-data", async (_, res) => {
  try {
    const response = await fetch(
      "https://www.google.com/streetview/static/feed/driving/data.json",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
        },
      }
    );

    const json = await response.json();
    res.json(json);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/country-data/:iso", async (req, res) => {
  const iso = req.params.iso.toUpperCase();

  if (!/^[A-Z]{2}$/.test(iso)) {
    return res.status(400).json({ error: "Invalid ISO code" });
  }

  try {
    const geojson = countryMap.get(iso);
    res.json(geojson);
  } catch (err) {
    res.status(500).json({ error: "Overpass query failed" });
  }
});

//port this runs on
app.listen(3001);
