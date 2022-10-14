// Converts from degrees to radians.
function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
 * Converts from radians to degrees.
 **/
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

/**
 *
 * @param {string} bearing
 * @returns {string}
 * Converts a bearing text into a readable bearing with
 * the appropriate annotations for angle, minutes and seconds.
 * (000°00’00”)
 */
function formatBearing(bearing) {
  var bearingText = "";
  bearing = String(bearing);
  bearing = bearing.split(".");
  bearing[0] += "°";
  bearing[1] += "’";
  bearing[2] += "”";

  for (let index = 0; index < bearing.length; index++) {
    bearingText += bearing[index];
  }
  return bearingText;
}

// ======================================================
/*
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
  var min;
  var sec;

  if (x[1] * 60 > 59) {
    min = Math.floor(min);
    sec = Math.floor(((x[1] * 60) % 1) * 60);
  } else {
    min = x[1] * 60;
    sec = Number("0." + String(min).split(".")[1]) * 60;
  }
  const val_in_degrees = [
    Number(x[0]),
    Math.floor(Number(min)),
    Math.floor(Number(sec.toFixed(0))),
  ];
  return val_in_degrees;
}
// ======================================================
// exporting functions and variables from this module

export {
  formatBearing,
  degrees_to_dms,
  dms_to_degrees,
  bearing,
  toDegrees,
  toRadians,
};

function sanitizer(arr) {
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] == "") {
      arr;
    }
  }
}

function print(...elem) {
  console.log(...elem);
}
const x = [1, 2, 3, 4, 4];
var a = [];
const b = Array();
console.log(typeof b);
console.log(typeof Number("3"));
print(8, 6, [4, 8]);
var heights = x.map((elem) => {
  return 30;
});
print(heights);
