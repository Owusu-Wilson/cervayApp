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

  // getting thte coordinates from positions 1 to n-1
  for (let index = 1; index < adjusted_bearings.length - 1; index++) {
    coordinates[index] = {
      x: instrumentStation.x + lat_i[index - 1] + corrections_x[index - 1],
      y: instrumentStation.y + dep_i[index - 1] + corrections_y[index - 1],
    };
  }
  return {
    corrections: [corrections_x, corrections_y],
    latitude_errors: lat_i,
    departure_errors: dep_i,
    coordinates: coordinates,
  };
}

// =====================================================
