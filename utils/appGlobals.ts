// define our parent property accessible via globalThis. Also apply the TypeScript type.
var app: globalAppVariables;

// define the child properties and their types. 
type globalAppVariables = {
  pmv: boolean;
  // more can go here. 
};

// set the values.
globalThis.app = {
  pmv:false
  // more can go here.
};

