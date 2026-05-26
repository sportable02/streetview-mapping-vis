import React from "react";
import { useMemo } from "react";
import { GeoJSON } from "react-leaflet";
import { useQueries } from "@tanstack/react-query";
import { getRegion } from "./api";
import L from "leaflet";
const Nodes = React.memo((Props) => {
  const { regions } = Props;

  const data = useQueries({
    queries: (regions ?? []).map((node) => ({
      queryKey: ["region", node.region, node.iso],
      queryFn: getRegion,
      enabled: !!node.region && !!node.iso,
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 10,
      select: (data) => ({
        type: "Feature",
        geometry: data.features[0].geometry,
        properties: {}
      })
    })),
  });

  const successfulData = useMemo(() => data
    ? data
      .filter((d) => d.status === "success" && d.data)
      .map((d) => {
        return Array.isArray(d.data) ? d.data[0] : d.data;
      })
    : [], [data]);

  const collection = useMemo(() => ({
    type: "FeatureCollection",
    features: successfulData
      .filter(d => d?.features?.[0])
      .map(d => d.features[0])
  }), [successfulData]);

  const pointToLayer = (feature, latlng) => {
    return L.circleMarker(latlng, {
      radius: 3,
      fillColor: "#3388ff",
      color: "#000",
      weight: 0.5,
      interactive: false // Critical for performance
    });
  };

  return (
    <GeoJSON
      data={collection}
      pointToLayer={pointToLayer}
    />
  );

  // return (
  //   <>
  //     {successfulData.map((geojson) => {

  //       if (!geojson?.features?.[0]) return null

  //       const id = geojson.place_id || geojson.features[0].id;

  //       return (
  //         <GeoJSON
  //           key={id}
  //           data={geojson}
  //           pointToLayer={(feature, latlng) => {
  //             return L.circleMarker(latlng, {
  //               radius: 3,
  //               fillColor: "#3388ff",
  //               opacity: 0,
  //               fillOpacity: 0.7,
  //               interactive: false,
  //             });
  //           }}
  //         ></GeoJSON>
  //       );
  //     })}
  //   </>
  // );
});

Nodes.displayName = "Nodes";
export default Nodes;
