import image_importer from './helper_switchgen.js';
import RAW_OBJECTS_DATA from './data.json';

const OBJECT_TYPES = Object.freeze({
  STRUCTURE: 'Structure',
  RAW_MATERIAL: 'Raw Material',
  EQUIPMENT: 'Equipment',
});

const OBJECT_NAMES = Object.freeze({
  YMIR_FLESH: 'Ymir Flesh',
  WITHERED_BONE: 'Withered Bone',
});

const mentioned = new Set();
const loaded = new Set();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ALL_OBJECTS_DATA = {};
RAW_OBJECTS_DATA.forEach((rawData) => {
  loaded.add(rawData.name);
  ALL_OBJECTS_DATA[rawData.name] = rawData;
  ALL_OBJECTS_DATA[rawData.name].image = image_importer(rawData.name);
  if (rawData.recipe !== '') {
    const modifiedRecipe = [];
    const tokens = rawData.recipe.split(' ').filter(Boolean);
    let number = null;
    let word = null;
    tokens.forEach((token) => {
      const trimmedToken = token.trim();
      const parsed = parseInt(trimmedToken, 10);
      if (!Number.isNaN(parsed)) {
        if (word !== null) { // write out and zero
          modifiedRecipe.push({ name: word, quantity: number });
          word = null;
        }
        number = parsed;
      } else if (word !== null) { // write out and zero
        word += ' ';
        word += capitalizeFirstLetter(token);
      } else {
        word = capitalizeFirstLetter(token);
      }
    });
    modifiedRecipe.push({ name: word, quantity: number });
    ALL_OBJECTS_DATA[rawData.name].recipe = modifiedRecipe;

    modifiedRecipe.forEach((element) => {
      mentioned.add(element.name);
    });
  }
});
const a_minus_b = new Set([...mentioned].filter((x) => !loaded.has(x)));
console.log(a_minus_b); // all recipe items that arent contained in my data

export {
  OBJECT_NAMES, ALL_OBJECTS_DATA,
};
