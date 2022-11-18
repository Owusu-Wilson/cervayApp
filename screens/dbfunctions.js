import AsyncStorage from "@react-native-async-storage/async-storage";

async function addData(data) {
  try {
    await AsyncStorage.setItem(`traverseSheet${data.id}`, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}
async function getData(key) {
  try {
    let a = await AsyncStorage.getItem(key);
    return a;
  } catch (error) {
    console.log(error);
  }
}

export { addData, getData };
