import { GeoJSON, Tooltip } from "react-leaflet";
import { useState } from "react";
import { getCountryGeom } from "./api";
import { useQuery } from "@tanstack/react-query";

const MapCountry = (Props) => {
  const { countryData } = Props;
  const [isSelected, setIsSelected] = useState(false);
  const { error, data: countryGeom } = useQuery({
    queryKey: ["CountryGeom", countryData.code],
    queryFn: getCountryGeom,
    enabled: !!countryData.code,
  });

  if (error) console.error(error);

  return (
    <>
      {countryGeom && (
        <GeoJSON
          data={countryGeom}
          style={{
            fillColor: countryData.isDriving ? "#00EE00" : "#FF0000",
            opacity: isSelected ? 1 : 0,
            fillOpacity: 0.4,
          }}
          eventHandlers={{
            mouseover: () => {
              setIsSelected(true);
            },
            mouseout: () => {
              setIsSelected(false);
            },
          }}
        >
          <Tooltip className="country-tooltip" sticky>{`${countryData.countryName} - ${countryData.isDriving ? "driving" : "not driving"}`}</Tooltip>
        </GeoJSON>
      )}
    </>
  );
};

export default MapCountry;
