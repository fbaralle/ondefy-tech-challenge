export const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const simulateApiResponse = async (returnData) => {
  await timeout(3000);
  return returnData;
};
