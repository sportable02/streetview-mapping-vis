export function parseCountryData(data) {
  const dataMap = new Map();
  if (data) {
    data.forEach((datapoint) => {
      const isDriving = !/^No Driving/i.test(datapoint.districts);
      const countryName = datapoint.country;
      const countryCode = datapoint.code.toUpperCase();

      const mapVal = dataMap.get(countryCode);
      if (mapVal) {
        if (!mapVal.driving && isDriving) {
          dataMap.set(countryCode, {
            countryName,
            isDriving: true,
            code: countryCode,
          });
        }
      } else {
        dataMap.set(countryCode, {
          countryName,
          isDriving,
          code: countryCode,
        });
      }
    });
  }

  return Array.from(dataMap.values());

  //   return Array.from(dataMap.values()).sort((a, b) =>
  //     a.countryName.localeCompare(b.countryName)
  //   );
}

export function parseRegionData(data) {
  const dataMap = new Map();
  if (data) {
    data.forEach((datapoint) => {
      const region = datapoint.region;
      const countryCode = datapoint.code.toUpperCase();

      if (region && !dataMap.has(region)) {
        dataMap.set(region, { region, iso: countryCode });
      }
    });
  }

  return Array.from(dataMap.values());
}
