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
  bearing[0] = String(Math.round(Number(bearing[0]))) + "°";
  bearing[1] = String(Math.round(Number(bearing[1]))) + "’";
  bearing[2] = String(Math.round(Number(bearing[2]))) + "”";

  for (let index = 0; index < bearing.length; index++) {
    bearingText += bearing[index];
  }
  return bearingText;
}

/**
 * gives the radius and angle in a complex plane from a rctangular coordinate
 * @param {*} x
 * @param {*} y
 * @returns r, theta
 */
function Pol(x, y) {
  var r = Math.sqrt(x ** 2 + y ** 2);
  var theta = toDegrees(Math.atan2(y, x));

  return { r: r, theta: theta };
}

/**
 * Returns an array of unadjusted bearings
 * @param {*} includedAngles
 * @param {*} bearing
 * @returns
 */
function getUnadjustedBearings(includedAngles, bearing) {
  let unadj_angles = [];
  let a = dms_to_degrees(includedAngles[0]) + bearing;
  if (a < 180) {
    a = a + 180;
  } else if (a > 180) {
    if (a > 540) {
      a = a - 540;
    } else {
      a = a - 180;
    }
  }
  unadj_angles[0] = a;

  let temp = 0;
  for (let index = 1; index < includedAngles.length; index++) {
    const element = data[index];
    temp = dms_to_degrees(element) + unadj_angles[index - 1];

    if (temp < 180) {
      temp = temp + 180;
    } else if (temp > 180) {
      if (temp > 540) {
        temp = temp - 540;
      } else {
        temp = temp - 180;
      }
    }
    unadj_angles.push(temp);
  }
  return unadj_angles;
}

// ======================================================
/**
 * Returns an array of adjusted bearings, adjustment values and misclose 
 * @param {number} alpha  Pol(instrument_station.x - ref_station.x,
instrument_station.y - ref_station.y) 
 * @param {number} beta Pol(ref_station.x - instrument_station.x,
ref_station.y - instrument_station.y) 
 * @param {number} num_stations 
 * @param {number} last_unadj_bearing 
 */
function getAdjustedBearings(alpha, beta, num_stations, unadj_bearing) {
  if (alpha < 0) {
    alpha = alpha + 360;
  }
  if (beta < 0) {
    beta = beta + 360;
  }
  let misclose = unadj_bearing[num_stations - 1] - beta;
  //   applying conditions to misclose
  //   if misclose is -ve, e = +ve a_i
  // if misclose is +ve, e = -ve a_i
  misclose = -misclose;
  let misclose_per_station = misclose / num_stations;
  let adjusted_bearings = [];
  let adjustments = [];
  adjusted_bearings[0] = alpha;

  for (let index = 0; index < num_stations - 1; index++) {
    adjustments.push(misclose_per_station * index);
    adjusted_bearings.push(unadj_bearing[index] + misclose_per_station * index);
  }
  adjusted_bearings[num_stations] = beta;
  let params = {
    alpha: alpha,
    beta: beta,
    num_stations: num_stations,
    last_unadj_bearing: unadj_bearing[num_stations - 1],
  };
  return {
    params: params,
    misclose: misclose,
    adjustments: adjustments,
    adj_angles: adjusted_bearings,
  };
}
// ======================================================
/**
 * Returns a list of coordinates(x, y) given adjusted bearings and distances.
 * @param {Array<Number>} adjusted_bearings array of computed adjusted bearins
 * @param {Array<Number>} distance array of distances collected from traverse sheet
 * @param {number} instrumentStation instrument station coordinates recorded. Used as the first coordinates.
 * @returns coordinates{x, y}
 */
function getCoordinates(adjusted_bearings, distance, instrumentStation) {
  // lat_i = l * cos(theta)
  // dep_i = l * sin(theta)

  let lat_i = [];
  let dep_i = [];
  let corrections_x = [];
  let corrections_y = [];
  let coordinates = [];
  for (let index = 0; index < adj.adj_angles.length; index++) {
    lat_i.push(
      distance[index] * Math.cos(toRadians(adj.adj_angles[index + 1]))
    );
  }
  for (let index = 0; index < adj.adj_angles.length; index++) {
    dep_i.push(
      distance[index] * Math.sin(toRadians(adj.adj_angles[index + 1]))
    );
  }
  //  after computing for the arrays above, there is NaN, 0 and -0 included
  // the following code removes them to sanitize the array for further computations
  lat_i.pop();
  lat_i.pop();
  dep_i.pop();
  dep_i.pop();
  for (let index = 0; index < distance.length; index++) {
    corrections_x.push((-sum(lat_i) / sum(distance)) * distance[index]);
    corrections_y.push((-sum(dep_i) / sum(distance)) * distance[index]);
  }
  coordinates[0] = { x: instrumentStation.x, y: instrumentStation.y };
  coordinates[adjusted_bearings.length] = {
    x: instrumentStation.x,
    y: instrumentStation.y,
  };
  // coordinates[1] = {
  //   x: instrumentStation.x + lat_i[0],
  //   y: instrumentStation.y + dep_i[0],
  // };

  // getting thte coordinates from positions 1 to n-1
  for (let index = 0; index < distance.length - 2; index++) {
    coordinates[index + 1] = {
      x:
        coordinates[index].x +
        lat_i[index] +
        (corrections_x[index - 1] || (true && 0)),
      y:
        coordinates[index].y +
        dep_i[index] +
        (corrections_y[index - 1] || (true && 0)),
      // x: lat_i[index],
      // y: coordinates[index].x,
      // z: corrections_x[index - 1] || (true && 0),
      // y: coordinates[index + 1].y + dep_i[index] + corrections_y[index - 1],
    };
  }
  return {
    adjusted_bearings: adjusted_bearings,
    corrections: [corrections_x, corrections_y],
    latitude_errors: lat_i,
    departure_errors: dep_i,
    coordinates: coordinates,
  };
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
  Pol,
  formatBearing,
  degrees_to_dms,
  dms_to_degrees,
  bearing,
  toDegrees,
  toRadians,
  getAdjustedBearings,
  getCoordinates,
  getUnadjustedBearings,
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
