function degrees_to_dms(degrees_value) {
  degrees_value = Number(degrees_value);
  let d = Math.trunc(degrees_value);
  let m = Math.trunc((degrees_value - d) * 60);
  let s = (degrees_value - d - m / 60) * 3600;

  return [d, m, s];
}
