export const getStreetView = async ({ signal }) => {
  const res = await fetch("api/api/streetview-data", { signal });
  if (!res.ok) throw new Error("Streetview fetch failed");
  return res.json();
};

export const getCountryGeom = async ({ queryKey, signal }) => {
  const [, countryCode] = queryKey;
  const res = await fetch(`api/api/country-data/${countryCode}`, { signal });
  if (!res.ok) throw new Error(`${countryCode} geometry fetch failed`);
  return res.json();
};

export const getRegion = async ({ queryKey, signal }) => {
  const [, region, iso] = queryKey;
  const res = await fetch(`api/api/get-region?region=${region}&iso=${iso}`, {
    signal,
  });
  if (!res.ok) throw new Error(`Node fetch failed`);
  return res.json();
};
