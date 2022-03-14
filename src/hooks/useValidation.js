import { useContext, useState, useEffect } from 'react';
import CoinSwapContext from 'contexts/CoinSwapContext';

const useValidation = () => {
  const [
    {
      swapCoin,
      targetCoin,
      swapAmount,
      isLoadingCoinsList,
      selectedNetwork,
      isLoadingSwapCoin,
      isLoadingTargetCoin,
      isLoadingNetworksList,
    },
  ] = useContext(CoinSwapContext);

  const [isValidInput, setIsValidInput] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const coinsSelected = swapCoin?.id && targetCoin?.id;
  const isSameCoin = coinsSelected && swapCoin.id === targetCoin.id;
  const networkSelected = selectedNetwork?.networkKey;
  const sufficientBalance = swapAmount <= (swapCoin?.amount ?? 0);
  const isValidSwapAmount = swapAmount >= 0 && sufficientBalance;
  const isNotZeroAmount = swapAmount > 0;
  const isLoadingDependencies =
    isLoadingCoinsList ||
    isLoadingSwapCoin ||
    isLoadingTargetCoin ||
    isLoadingNetworksList;

  const swapButtonEnabled =
    coinsSelected &&
    networkSelected &&
    !isLoadingDependencies &&
    isValidSwapAmount &&
    isNotZeroAmount &&
    !isSameCoin;

  const validateInput = () => {
    let errorMessageValidation = null;

    if (coinsSelected && !sufficientBalance) {
      errorMessageValidation = 'Insufficient balance';
    } else if (!coinsSelected && !sufficientBalance) {
      errorMessageValidation = 'Select swap and target tokens';
    } else if (isSameCoin) {
      errorMessageValidation = 'Can not convert to the same token';
    } else if (!isValidSwapAmount) {
      errorMessageValidation = 'Invalid amount';
    } else if (!networkSelected) {
      errorMessageValidation = 'Select a valid network';
    }
    setIsValidInput(!errorMessageValidation);
    setErrorMessage(errorMessageValidation);
  };

  useEffect(() => {
    validateInput();
  }, [
    isValidSwapAmount,
    sufficientBalance,
    coinsSelected,
    networkSelected,
    isSameCoin,
  ]);

  return { swapButtonEnabled, isValidInput, errorMessage };
};

export default useValidation;
