//import queryOverpass from "@derhuerst/query-overpass";
import express from "express";
import fetch from "node-fetch";
//import osmtogeojson from "osmtogeojson";
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

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

app.get("/api/get-region", async (req, res) => {
  await delay(1000);
  const { region, iso } = req.query;

  if (!region || !iso)
    return res.status(400).json({ error: "Missing region or iso in query" });

  try {
    //search node geo data
    const params = new URLSearchParams({
      q: `${region}, ${iso}`,
      format: "geojson",
      limit: 1,
    });
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params.toString()}`,
      {
        headers: { "User-Agent": "StreetViewMappingVisualization/1.0" },
      }
    );

    const data = await response.json();

    if (Array.isArray(data) && data.length === 0) {
      return res.status(404).json({ error: "No region node found" });
    }

    return res.json(data);
  } catch (err) {
    res.status(500).json({ error: `${err.message}` });
  }

  //   try {
  //     const data = await queryOverpass(`
  //         [out:json][timeout:90];
  //         (area["ISO3166-1"="${iso}"]["admin_level"="2"];)->.country;
  //         node["name"~"^${region}$", i](area.country);
  //         out geom 1;
  //     `);
  //     const geojson = osmtogeojson({
  //       version: 0.6,
  //       generator: "query-overpass",
  //       elements: data,
  //     });
  //     res.json(geojson);
  //   } catch (err) {
  //     res.status(500).json({ error: `Overpass query failed - ${err}` });
  //   }
});

//port this runs on
app.listen(3001);
