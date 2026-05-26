# Google Street View Mapping Visualization

This project aims to create a new visualization using a [Leaflet](https://leafletjs.com/) map for the data available at https://www.google.com/streetview/how-it-works/ which was initially accessed through a drop-down menu style interface. This site uses JSON data available on https://www.google.com/streetview/static/feed/driving/data.json. The project uses mainly React with [Leaflet](https://leafletjs.com/) through the [react-leaflet](https://react-leaflet.js.org/) package to visualize the countries where Google Street View coverage is currently being captured. Google's JSON file is used to then populate the map with the country geometries.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
