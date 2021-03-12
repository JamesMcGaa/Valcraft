import AsyncStorage from '@react-native-async-storage/async-storage';

function isNormalInteger(str) {
  return /^\+?(0|[1-9]\d*)$/.test(str);
}

async function storeData(key, val) {
  try {
    await AsyncStorage.setItem(key, val.toString());
  } catch (error) {
    console.log(error);
  }
}

async function retrieveData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
  return '0';
}

export { storeData, retrieveData, isNormalInteger };
