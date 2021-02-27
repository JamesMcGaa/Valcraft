import WORKBENCH_IMAGE from './assets/Workbench.png';
import WOOD_IMAGE from './assets/Wood.png';
import ABYSSAL_RAZOR_IMAGE from './assets/Abyssal_razor.png';

const OBJECT_TYPES = Object.freeze({
  STRUCTURE: 'Structure',
  RAW_MATERIAL: 'Raw Material',
  EQUIPMENT: 'Equipment',
});

const OBJECT_NAMES = Object.freeze({
  WORKBENCH: 'Workbench',
  WOOD: 'Wood',
  ABYSSAL_RAZOR_1: 'Abyssal Razor (1)',
});

const ALL_OBJECTS_DATA = {
  [OBJECT_NAMES.WORKBENCH]: {
    name: OBJECT_NAMES.WORKBENCH,
    image: WORKBENCH_IMAGE,
    type: OBJECT_TYPES.STRUCTURE,
    requirements: [{ name: OBJECT_NAMES.WOOD, quantity: 2 }],
    description: 'The workbench is used to expand crafting capabilities and disable enemy spawns within a 20m radius. A workbench can be upgraded by placing upgrade items within 2m. ',
  },
  [OBJECT_NAMES.WOOD]: {
    name: OBJECT_NAMES.WOOD,
    image: WOOD_IMAGE,
    type: OBJECT_TYPES.RAW_MATERIAL,
    description: 'Wood is a fundamental crafting material dropped by all trees. Wood can be placed in a Charcoal kiln to produce Coal',
  },
  [OBJECT_NAMES.ABYSSAL_RAZOR_1]: {
    name: OBJECT_NAMES.ABYSSAL_RAZOR_1,
    image: ABYSSAL_RAZOR_IMAGE,
    type: OBJECT_TYPES.EQUIPMENT,
    description: 'A knife from the deep.',
  },
};

export {
  OBJECT_NAMES, ALL_OBJECTS_DATA,
};
