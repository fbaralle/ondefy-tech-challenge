import { createContext, useReducer, useRef, useEffect } from 'react';
import CoinSwapReducer, {
  defaultCoinSwap,
  actions,
} from 'reducers/CoinSwapReducer';
import { simulateApiResponse } from 'utils';
import {
  getCoinData,
  getCoinsList,
  getNetworksList,
  getTargetAmount,
} from 'services';

const {
  UPDATING_COINS_LIST,
  UPDATING_NETWORKS_LIST,
  UPDATING_TARGET_AMOUNT,
  UPDATING_TARGET_DATA,
  UPDATING_SWAP_DATA,
  UPDATE_SWAP_COIN,
  UPDATE_TARGET_COIN,
  UPDATE_COINS_LIST,
  UPDATE_NETWORKS_LIST,
  UPDATE_SELECTED_NETWORK,
  UPDATE_SWAP_AMOUNT,
  UPDATE_SWAP_DATA,
  UPDATE_TARGET_AMOUNT,
  UPDATE_TARGET_DATA,
} = actions;

const CoinSwapContext = createContext([defaultCoinSwap, {}]);
const CoinSwapConsumer = CoinSwapContext.Consumer;
const CoinSwapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CoinSwapReducer, defaultCoinSwap);

  const contextActions = useRef({
    updateSelectedNetwork: (selectedNetwork) => {
      dispatch({
        type: UPDATE_SELECTED_NETWORK,
        data: { selectedNetwork },
      });
    },
    updateSwapAmount: (swapAmount) => {
      dispatch({ type: UPDATE_SWAP_AMOUNT, data: { swapAmount } });
      dispatch({
        type: UPDATE_TARGET_AMOUNT,
        data: { targetAmount: 0 },
      });
    },
    updateSwapData: async (swapCoin) => {
      dispatch({ type: UPDATING_SWAP_DATA });
      try {
        const response = await simulateApiResponse(getCoinData(swapCoin.id));
        dispatch({
          type: UPDATE_SWAP_DATA,
          data: {
            swapCoin: response.selectedCoin ?? {},
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
    updateTargetData: async (targetCoin) => {
      dispatch({ type: UPDATING_TARGET_DATA });

      try {
        const response = await simulateApiResponse(getCoinData(targetCoin.id));
        dispatch({
          type: UPDATE_TARGET_DATA,
          data: {
            targetCoin: response.selectedCoin ?? {},
          },
        });
        dispatch({
          type: UPDATE_TARGET_AMOUNT,
          data: { targetAmount: 0 },
        });
      } catch (e) {
        console.error(e);
      }
    },
    updateNetworksList: async () => {
      dispatch({ type: UPDATING_NETWORKS_LIST });

      try {
        const response = await simulateApiResponse(getNetworksList());
        dispatch({
          type: UPDATE_NETWORKS_LIST,
          data: {
            networksList: response,
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
    updateCoinsList: async () => {
      dispatch({ type: UPDATING_COINS_LIST });

      try {
        const response = await simulateApiResponse(getCoinsList());
        dispatch({
          type: UPDATE_COINS_LIST,
          data: {
            coinsList: response,
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
    updateSwapCoin: (swapCoin) => {
      dispatch({ type: UPDATE_SWAP_COIN, data: { swapCoin } });
    },
    updateTargetCoin: (targetCoin) => {
      dispatch({ type: UPDATE_TARGET_COIN, data: { targetCoin } });
    },
    updateTargetAmount: async ({ swapAmount, swapCoin, targetCoin }) => {
      dispatch({ type: UPDATING_TARGET_AMOUNT });
      try {
        const response = await simulateApiResponse(
          getTargetAmount({ swapAmount, swapCoin, targetCoin })
        );
        dispatch({
          type: UPDATE_TARGET_AMOUNT,
          data: { targetAmount: response },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  useEffect(() => {
    contextActions.current.updateNetworksList();
    contextActions.current.updateCoinsList();
  }, []);

  useEffect(() => {
    if (state.swapCoin?.id) {
      contextActions.current.updateSwapData(state.swapCoin);
    }
    contextActions.current.updateSwapAmount(0);
  }, [state.swapCoin]);

  useEffect(() => {
    if (state.targetCoin?.id)
      contextActions.current.updateTargetData(state.targetCoin);
  }, [state.targetCoin]);

  return (
    <CoinSwapContext.Provider value={[state, contextActions.current]}>
      {children}
    </CoinSwapContext.Provider>
  );
};

export { CoinSwapProvider, CoinSwapConsumer };
export default CoinSwapContext;
