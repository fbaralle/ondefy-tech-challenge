export const defaultCoinSwap = {
  isLoadingConversion: false,
  isLoading: false,
  isLoadingCoinsList: false,
  isLoadingSwapCoin: false,
  isLoadingTargetCoin: false,
  isLoadingNetworksList: false,
  isLoadingTargetAmount: false,
  coinsList: [],
  networksList: [],
  swapCoin: {
    id: null,
    label: null,
    price: null,
    logoURI: null,
    amount: 0,
    amountUSD: 0,
  },
  targetCoin: {
    id: null,
    label: null,
    price: null,
    logoURI: null,
    amount: 0,
    amountUSD: 0,
  },
  selectedNetwork: {
    name: null,
    networkKey: null,
    logoURI: null,
  },
  swapAmount: 0,
  targetAmount: 0,
};

export const actions = {
  UPDATING: 'UPDATING',
  UPDATING_COINS_LIST: 'UPDATING_COINS_LIST',
  UPDATING_NETWORKS_LIST: 'UPDATING_NETWORKS_LIST',
  UPDATING_TARGET_AMOUNT: 'UPDATING_TARGET_AMOUNT',
  UPDATING_SWAP_DATA: 'UPDATING_SWAP_DATA',
  UPDATING_TARGET_DATA: 'UPDATING_TARGET_DATA',
  UPDATE_SWAP_COIN: 'UPDATE_SWAP_COIN',
  UPDATE_TARGET_COIN: 'UPDATE_TARGET_COIN',
  UPDATE_COINS_LIST: 'UPDATE_COINS_LIST',
  UPDATE_NETWORKS_LIST: 'UPDATE_NETWORKS_LIST',
  UPDATE_SELECTED_NETWORK: 'UPDATE_SELECTED_NETWORK',
  UPDATE_SWAP_AMOUNT: 'UPDATE_SWAP_AMOUNT',
  UPDATE_SWAP_DATA: 'UPDATE_SWAP_DATA',
  UPDATE_TARGET_AMOUNT: 'UPDATE_TARGET_AMOUNT',
  UPDATE_TARGET_DATA: 'UPDATE_TARGET_DATA',
};

const CoinSwapReducer = (state, { type, data }) => {
  switch (type) {
    case actions.UPDATING:
      return {
        ...state,
        isLoading: true,
      };
    case actions.UPDATING_COINS_LIST:
      return {
        ...state,
        isLoadingCoinsList: true,
      };
    case actions.UPDATING_NETWORKS_LIST:
      return {
        ...state,
        isLoadingNetworksList: true,
      };
    case actions.UPDATING_TARGET_AMOUNT:
      return {
        ...state,
        isLoadingTargetAmount: true,
      };
    case actions.UPDATING_SWAP_DATA:
      return {
        ...state,
        isLoadingSwapCoin: true,
      };
    case actions.UPDATING_TARGET_DATA:
      return {
        ...state,
        isLoadingTargetCoin: true,
      };
    case actions.UPDATE_SWAP_COIN:
      return {
        ...state,
        swapCoin: data.swapCoin,
        isLoadingSwapCoin: false,
      };
    case actions.UPDATE_TARGET_COIN:
      return {
        ...state,
        targetCoin: data.targetCoin,
        isLoadingTargetCoin: false,
      };
    case actions.UPDATE_COINS_LIST:
      return {
        ...state,
        coinsList: data.coinsList,
        isLoadingCoinsList: false,
      };
    case actions.UPDATE_NETWORKS_LIST:
      return {
        ...state,
        networksList: data.networksList,
        isLoadingNetworksList: false,
      };
    case actions.UPDATE_SELECTED_NETWORK:
      return {
        ...state,
        selectedNetwork: data.selectedNetwork,
      };
    case actions.UPDATE_SWAP_AMOUNT:
      return {
        ...state,
        swapAmount: data.swapAmount,
      };
    case actions.UPDATE_TARGET_AMOUNT:
      return {
        ...state,
        targetAmount: data.targetAmount,
        isLoadingTargetAmount: false,
      };
    case actions.UPDATE_SWAP_DATA:
      return {
        ...state,
        swapCoin: data.swapCoin,
        isLoadingSwapCoin: false,
      };
    case actions.UPDATE_TARGET_DATA:
      return {
        ...state,
        targetCoin: data.targetCoin,
        isLoadingTargetCoin: false,
      };
    default:
      return state;
  }
};

export default CoinSwapReducer;
