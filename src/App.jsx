import { useQuery } from "@tanstack/react-query";
// import Nodes from "./Nodes";
import { MapContainer, TileLayer } from "react-leaflet";
import MapCountries from "./MapCountries";
import { getStreetView } from "./api";
import { parseCountryData, /*parseRegionData*/ } from "./utils";

const App = () => {
  const {
    //status,
    error,
    data: streetviewData,
  } = useQuery({
    queryKey: ["streetview"],
    queryFn: getStreetView,
  });

  if (error) console.error("Could not load streetview data: ", error);

  return (
    <div id="app" >
      {/* <div id="stati">
        <Status val={mapStatus} />
      </div> */}
      <h1 id="title">Google Street View - Current Mapping</h1>
      <MapContainer
        preferCanvas={true}
        key={streetviewData?.length ?? 0}
        center={[30, 10]}
        zoom={2}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCountries
          data={parseCountryData(streetviewData)}
        />
        {/* {streetviewData && <Nodes regions={parseRegionData(streetviewData)} />} */}
      </MapContainer>
    </div>
  );
};

export default App;
