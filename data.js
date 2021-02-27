import WORKBENCH_IMAGE from './assets/Workbench.png';

const OBJECT_NAMES = Object.freeze({
  WORKBENCH: 'Workbench',
  WOOD: 'Wood',
});

const ALL_OBJECTS_DATA = {
  [OBJECT_NAMES.WORKBENCH]: {
    image: WORKBENCH_IMAGE,
    requirements: [{ name: OBJECT_NAMES.WOOD, quantity: 2 }],
    description: 'The workbench is used to expand crafting capabilities and disable enemy spawns within a 20m radius. A workbench can be upgraded by placing upgrade items within 2m. ',
  },
  [OBJECT_NAMES.WOOD]: {
    description: 'Wood is a fundamental crafting material dropped by all trees. Wood can be placed in Charcoal kiln to produce Coal',
  },
};

export {
  OBJECT_NAMES, ALL_OBJECTS_DATA,
};
