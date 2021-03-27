export const loadPackages = () =>
  fetch(`https://data.jsdelivr.com/v1/stats/packages`)
    .then((r) => r.json())
    .then((data) => data)
    .catch(() => {
      return "Loading error";
    });

export const loadPackageInfo = ({ type, name }) =>
  fetch(`https://data.jsdelivr.com/v1/package/${type}/${name}`)
    .then((r) => r.json())
    .then((data) => data)
    .catch(() => {
      return "Loading error";
    });
