
// import {formatBearing, degrees_to_dms, dms_to_degrees} from '../api/functions'
/**
 *
 * @param {string} bearing
 * @returns {string}
 * Converts a bearing text into a readable bearing with
 * the appropriate annotations for angle, minutes and seconds.
 * (000°00’00”)
 */
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
 * @param {*} degrees_value
 * @returns
 */

function degrees_to_dms(degrees_value) {
  degrees_value = Number(degrees_value);
  let d = Math.trunc(degrees_value);
  let m = Math.trunc((degrees_value - d) * 60);
  let s = Math.trunc((degrees_value - d - m / 60) * 3600);

  return [d, m, s];
}

const data_string = `[
    {
      "from": "a",
      "to": "b",
      "included_angle": "161.41.18",
      "distance":130.07
    },
    {
      "from": "b",
      "to": "c",
      "included_angle": "245.15.53",
      "distance":72.32
    },
    {
      "from": "c",
      "to": "d",
      "included_angle": "279.13.24",
      "distance":123.53
    },
    {
      "from": "d",
      "to": "e",
      "included_angle": "197.37.48",
      "distance":82.36
    },
    {
      "from": "e",
      "to": "f",
      "included_angle": "227.35.7",
      "distance":49.05
    },
    {
      "from": "f",
      "to": "g",
      "included_angle": "271.51.16",
      "distance":93.40
    },
    {
      "from": "g",
      "to": "h",
      "included_angle": "56.45.20",
      "distance":0
    }
  ]
  `;

const data = JSON.parse(data_string);
const referenceStation_angle = { x: 334151.61, y: 1197056.15 };
const instrumentStation_angle = { x: 334250.45, y: 1197024.75 };

const x = instrumentStation_angle.x - referenceStation_angle.x;
const y = instrumentStation_angle.y - referenceStation_angle.y;

const x2 = referenceStation_angle.x - instrumentStation_angle.x;
const y2 = referenceStation_angle.y - instrumentStation_angle.y;

let alpha = Pol(x, y);
let beta = Pol(x2, y2);

let included_angles = [];
let unadj_angles = [];
let a = dms_to_degrees(data[0].included_angle) + alpha.theta + 180;
unadj_angles[0] = a;

let temp = 0;
for (let index = 1; index < data.length; index++) {
  const element = data[index];
  temp = dms_to_degrees(element.included_angle) + unadj_angles[index - 1];

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

/**
 * Returns an array of unadjusted bearings
 * @param {*} includedAngles
 * @param {*} bearing
 * @returns
 */
function getUnadjustedBearings(includedAngles, bearing) {
  let included_angles = includedAngles;
  let unadj_angles = [];
  let a = dms_to_degrees(data[0].included_angle) + bearing;
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
  for (let index = 1; index < data.length; index++) {
    const element = data[index];
    temp = dms_to_degrees(element.included_angle) + unadj_angles[index - 1];

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
let res = getUnadjustedBearings(included_angles, alpha.theta);
let adj = getAdjustedBearings(alpha.theta, beta.theta, 7, res);

// res.forEach(element => {
//     console.log(degrees_to_dms(element))
// });

// adj.adj_angles.forEach(element => {
//   console.log(degrees_to_dms(element))
// });

arr = [1, -2, 3, 4].reduce((x, y) => {
  return x + y;
});

let some1 = [105.31, 63.05, 25.15];
let some2 = [-76.99, -68.42, -47.64];
let some3 = some1.concat(some2);

function sum(arr) {
  let sumVal = 0;
  arr.forEach((element) => {
    sumVal += element;
  });
  return sumVal;
}
console.log(sum(some1) + sum(some2));
// console.log(sum(some2))
console.log(
  sum(
    some3.filter((x) => {
      return x > 0;
    })
  ) +
    sum(
      some3.filter((x) => {
        return x < 0;
      })
    )
);
// console.log(arr.indexOf(13));
// console.log(arr);
function getCoordinate(adjusted_bearings, distance, instrumentStation) {
  // adjusted_bearings = Array(adjusted_bearings);
  let lat_i = adjusted_bearings.map((i) => {
    return distance[adjusted_bearings.indexOf(i) + 1] * Math.cos(i);
  });
  let dep_i = adjusted_bearings.map((i) => {
    distance[adjusted_bearings.indexOf(i) + 1] * Math.sin(i);
  });

  // lat_error = sum (+ve  lat_i) - ( -ve  lat_i)
  // dep_error = sum (+ve  dep_i) - ( -ve  dep_i)

  let lat_error =
    sum(
      lat_i.filter((x) => {
        return x > 0; // sum of the +ve elements in the array
      })
    ) +
    sum(
      lat_i.filter((x) => {
        return x < 0; // sum of the +ve elements in the array
      })
    );
  let dep_error =
    sum(
      dep_i.filter((x) => {
        return x > 0; // sum of the +ve elements in the array
      })
    ) +
    sum(
      dep_i.filter((x) => {
        return x < 0; // sum of the +ve elements in the array
      })
    );

  // correction_x = [(lat_error[conditions applied])/total_distance ] * distance_i
  // correction_y = [(dep_error[conditions applied])/total_distance ] * distance_i

  let correction_x = distance.map((i) => {
    (-lat_error / sum(distance)) * i;
  });
  let correction_y = distance.map((i) => {
    (-dep_error / sum(distance)) * i;
  });

  let coordinates = [];
  coordinates[0] = { x: instrumentStation.x, y: instrumentStation.y };
  coordinates[distance.length] = {
    x: instrumentStation.x,
    y: instrumentStation.y,
  };
  // cordinates_2 TO cordinates_n-1
  // cordinates_i =
  // (instrumentStation_x+ lat_i + correction_xi,
  // instrumentStation_y + dep_i + correction_yi)
  for (let index = 1; index < distance.length; index++) {
    coordinates[index] = {
      x: instrumentStation.x + lat_i[index] + correction_x[index],
      y: instrumentStation.y + dep_i[index] + correction_y[index],
    };
  }

  return {
    correction_x: correction_x,
    correction_y: correction_x,
    coordinates: coordinates,
  };
}
function getCoordinates2(adjusted_bearings, distance, instrumentStation) {
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
  coordinates[1] = {
    x: instrumentStation.x + lat_i[0],
    y: instrumentStation.y + dep_i[0],
  };

  // getting thte coordinates from positions 1 to n-1
  for (let index = 2; index < adjusted_bearings.length - 1; index++) {
    coordinates[index] = {
      x: coordinates[index - 1].x + lat_i[index - 1] + corrections_x[index - 2],
      y: coordinates[index - 1].y + dep_i[index - 1] + corrections_y[index - 2],
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

// =================================================
const distance = [];
for (let index = 0; index < data.length; index++) {
  distance.push(data[index].distance);
}
console.log(distance);
let coors = getCoordinates2(adj.adj_angles, distance, instrumentStation_angle);

console.log(coors);
