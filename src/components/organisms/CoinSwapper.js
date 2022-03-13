import { useContext, useState, useEffect } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { ArrowSmDown } from '@styled-icons/heroicons-outline';
import CoinSwapContext from 'contexts/CoinSwapContext';
import CoinSelector from './CoinSelector';
import InputField from './InputField';
import NetworkSelector from './NetworkSelector';

const CoinSwapper = () => {
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
      isLoadingTargetAmount,
    },
    { updateTargetAmount },
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

  const onClickHandler = () => {
    updateTargetAmount({ swapAmount, swapCoin, targetCoin });
  };

  return (
    <Flex
      w="550px"
      borderRadius="10px"
      border="1px solid"
      borderColor="border.brandDecorative"
      padding={4}
      boxShadow="brand.drop"
      flexDirection="column"
    >
      <Flex justifyContent="space-between" w="100%" mb={4}>
        <CoinSelector />
        <NetworkSelector />
      </Flex>
      <InputField hasErrors={{ isValidInput, errorMessage }} />
      <Flex mb={4} marginX="auto">
        <ArrowSmDown width="30px" height="30px" />
      </Flex>
      <Flex mb={4}>
        <CoinSelector isTarget />
      </Flex>
      <InputField isTarget />
      <Button
        backgroundColor="btn.dark"
        _hover={{ backgroundColor: 'btn.darkHover' }}
        mt={3}
        isDisabled={!swapButtonEnabled}
        isLoading={isLoadingTargetAmount}
        onClick={onClickHandler}
      >
        Set amounts
      </Button>
    </Flex>
  );
};

export default CoinSwapper;
