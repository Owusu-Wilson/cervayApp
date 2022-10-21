import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";


const generateExcel = (dataArray) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(dataArray);

    XLSX.utils.book_append_sheet(wb, ws, "MyFirstSheet", true);

    // let ws2 = XLSX.utils.aoa_to_sheet([
    //   ["Odd*2", "Even*2", "Total"],
    //   [
    //     { t: "n", f: "MyFirstSheet!A2*2" },
    //     { t: "n", f: "MyFirstSheet!B2*2" },
    //     { t: "n", f: "A2+B2" },
    //   ],
    //   [
    //     { t: "n", f: "MyFirstSheet!A3*2" },
    //     { t: "n", f: "MyFirstSheet!B3*2" },
    //     { t: "n", f: "A3+B3" },
    //   ],
    //   [
    //     { t: "n", f: "MyFirstSheet!A4*2" },
    //     { t: "n", f: "MyFirstSheet!B4*2" },
    //     { t: "n", f: "A4+B4" },
    //   ],
    // ]);

    // XLSX.utils.book_append_sheet(wb, ws2, "MySecondSheet", true);

    const base64 = XLSX.write(wb, { type: "binary",bookType:'xlsx' });
    const filename = FileSystem.documentDirectory + "MyTraverseExcel.xlsx";
    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      Sharing.shareAsync(filename);
    });
  };


  export {generateExcel}