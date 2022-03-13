import { useContext, useEffect, useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Skeleton,
} from '@chakra-ui/react';
import CoinSwapContext from 'contexts/CoinSwapContext';

const InputField = ({ isTarget = false, hasErrors }) => {
  const [
    {
      swapCoin,
      targetCoin,
      targetAmount,
      isLoadingCoinsList,
      isLoadingSwapCoin,
      isLoadingTargetCoin,
    },
    { updateSwapAmount },
  ] = useContext(CoinSwapContext);

  const [inputValue, setInputValue] = useState(0);

  const title = isTarget ? 'You will receive (est.)' : 'Amount to send';
  const selectedCoin = isTarget ? targetCoin : swapCoin;
  const tokenAmount = selectedCoin ? selectedCoin.amount.toFixed(6) : 0;
  const tokenAmountUSD = selectedCoin ? selectedCoin.amountUSD.toFixed(2) : 0;
  const errorMessage =
    !isTarget && hasErrors?.errorMessage ? hasErrors.errorMessage : null;
  const isValid = !isTarget && hasErrors?.isValid ? hasErrors.isValid : true;
  const value = isTarget ? targetAmount : inputValue;
  const isLoaded = !(isTarget ? isLoadingTargetCoin : isLoadingSwapCoin);
  const isDisabled = isLoadingCoinsList || !selectedCoin?.id;
  const showErrors = !isDisabled;

  const onChangeHandler = (e) => {
    return setInputValue(e.target.value);
  };

  useEffect(() => {
    updateSwapAmount(inputValue);
  }, [inputValue]);

  useEffect(() => {
    // reset input when swap token changes
    setInputValue('');
  }, [swapCoin]);

  return (
    <Flex flexDirection="column" mb={4}>
      <FormControl>
        <FormLabel display="flex" alignItems="end">
          <Text textColor="txt.muted" textStyle="body1Heavy">
            {title}
          </Text>
          {showErrors && errorMessage && (
            <Text as="span" ml={4} textColor="red.300" fontSize="sm">
              {`* ${errorMessage}`}
            </Text>
          )}
        </FormLabel>
        <Input
          placeholder={0}
          isInvalid={!isValid}
          isDisabled={isDisabled}
          isReadOnly={isTarget}
          value={value}
          type="number"
          paddingX={2}
          textColor="txt.primary"
          textStyle="body2Heavy"
          _focus={{
            borderColor: isTarget ? 'border.decorative' : 'border.brand',
          }}
          mb={1}
          border="3px solid"
          borderColor={
            isTarget ? 'border.decorative' : 'border.brandDecorative'
          }
          onChange={(e) => !isTarget && onChangeHandler(e)}
        />
      </FormControl>
      <Skeleton isLoaded={isLoaded} borderRadius="15px">
        <Text fontSize="xs" textColor="txt.brand">
          {`Balance: ${tokenAmount} (~$${tokenAmountUSD})`}
        </Text>
      </Skeleton>
    </Flex>
  );
};

export default InputField;
