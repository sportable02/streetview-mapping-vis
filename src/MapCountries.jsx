import MapCountry from "./MapCountry";
import { useMemo } from "react";

const MapCountries = (Props) => {
  //const [overpassStatus, setOverpassStatus] = useState();
  const { data } = Props;
  const countriesArr = useMemo(() => {
    return data;
  }, [data]);

  return (
    <>
      {countriesArr.map((countryData) => (
        <MapCountry
          key={countryData.code}
          countryData={countryData}
        />
      ))}
    </>
  );
};

export default MapCountries;
