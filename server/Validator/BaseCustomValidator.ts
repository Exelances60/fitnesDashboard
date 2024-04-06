export const customeAgeValidator = (value: any) => {
  if (+value < 18) {
    throw new Error("Age must be greater than 18");
  } else if (+value > 80) {
    throw new Error("Age must be less than 60");
  }
  return true;
};

export const customePhoneValidator = (value: any) => {
  const parsetPone = parseInt(value);
  if (isNaN(parsetPone)) {
    throw new Error("Phone number must be numeric");
  }
  if (value.length < 10) {
    throw new Error("Phone number must be at least 10 digits");
  }
  return true;
};

export const customeBodyWeightValidator = (value: any) => {
  const parsetValue = parseInt(value);
  if (isNaN(parsetValue)) {
    throw new Error("Body weight must be numeric");
  }
  if (parsetValue < 30) {
    throw new Error("Body weight must be greater than 30");
  }
  if (parsetValue > 300) {
    throw new Error("Body weight must be less than 200");
  }
  return true;
};

export const customeHeightValidator = (value: any) => {
  const parsetValue = parseInt(value);
  if (isNaN(parsetValue)) {
    throw new Error("Height must be numeric");
  }
  if (parsetValue < 100) {
    throw new Error("Height must be greater than 100");
  }
  if (parsetValue > 300) {
    throw new Error("Height must be less than 300");
  }
  return true;
};
