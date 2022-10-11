//This file contains helper functions to help convert between bearing and angle values.

function formatBearing(bearing, sep = ",") {
  var bearingText = "";
  bearing = String(bearing);
  bearing = bearing.split(sep);
  bearing[0] += "°";
  bearing[1] += "’";
  bearing[2] += "”";

  for (let index = 0; index < bearing.length; index++) {
    bearingText += bearing[index];
  }
  return bearingText;
}

function print(...args) {
  // console.log(...args);
}

// Converts from degrees to radians.
function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

// Converts from radians to degrees.
function toDegrees(radians) {
  return (radians * 180) / Math.PI;
}

function bearing(startLat, startLng, destLat, destLng) {
  startLat = toRadians(startLat);
  startLng = toRadians(startLng);
  destLat = toRadians(destLat);
  destLng = toRadians(destLng);

  y = Math.sin(destLng - startLng) * Math.cos(destLat);
  x =
    Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  brng = Math.atan2(y, x);
  brng = toDegrees(brng);
  return (brng + 360) % 360;
}

//  =========================================================

//   console.log(toDegrees())
// console.log(toRadians(120.87))
/**
 * converts dms value to degrees .
 * @param {*} dms_figure
 * @returns
 */
function dms_to_degrees(dms_figure) {
  dms_figure = String(dms_figure);
  const bearing = dms_figure.split(".");
  var degreesValue =
    Number(bearing[0]) + Number(bearing[1] / 60) + Number(bearing[2] / 3600);
  return degreesValue;
}

/**
 * converts degrees to dms value.
 * @param {*} dms_figure
 * @returns
 */
function degrees_to_dms(degree_figure) {
  degree_figure = String(degree_figure);
  const x = degree_figure.split(".");
  x[1] = `${"0." + x[1]}`;
  var min = x[1] * 60;
  var sec = 0;

  if (x[1] * 60 > 59) {
    min = Math.floor(min);
    sec = Math.floor(((x[1] * 60) % 1) * 60);
  }
  const val_in_degrees = [Number(x[0]), min, sec];
  return val_in_degrees;
}
let a = degrees_to_dms(120.54);

print(formatBearing(a.toString()));

export { dms_to_degrees, toRadians, degrees_to_dms };

// =======================================================
// TESTS
// =======================================================

const bearingLL1 = "120.34.43";
const bearingLL2 = "234.54.23";
const bearingRR1 = "007.003.21";
const bearingRR2 = "65.43.004";

// const res = Math.round(
//   dms_to_degrees(bearingLL1) -
//     dms_to_degrees(bearingRR2) / dms_to_degrees(bearingLL2) -
//     dms_to_degrees(bearingRR1)
// ).toFixed(4);

// const i = formatBearing(degrees_to_dms(res).toString());
// i;

console.log(dms_to_degrees(bearingLL1));
console.log(bearingLL1);
console.log(degrees_to_dms(dms_to_degrees(bearingLL1)));
