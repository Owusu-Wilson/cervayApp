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
  bearing = bearing.split(" ");
  bearing[0] += "°";
  bearing[1] += "’";
  bearing[2] += "”";

  for (let index = 0; index < bearing.length; index++) {
    bearingText += bearing[index];
  }
  return bearingText;
}

// exporting functions and variables from this module

export { formatBearing };

// function sanitizer(arr) {
//   for (let index = 0; index < arr.length; index++) {
//     if (arr[index] == ''){
//       arr.
//     }

//   }
// }
