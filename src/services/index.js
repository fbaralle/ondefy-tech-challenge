import { networks, tokens } from 'mocked-data';

export const getCoinData = (coinId) => {
  const [selectedCoin] = tokens.filter((tokenData) => tokenData.id === coinId);
  return { selectedCoin };
};

export const getNetworksList = () => {
  const networksList = networks;
  return networksList;
};

export const getCoinsList = () => {
  const tokensList = tokens;
  return tokensList;
};

export const getTargetAmount = ({ swapAmount, swapCoin, targetCoin }) => {
  const targetAmount = (swapAmount * swapCoin.price) / targetCoin.price;
  return targetAmount;
};
