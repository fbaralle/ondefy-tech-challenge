import { useContext } from 'react';
import useValidation from 'hooks/useValidation';
import { Flex, Button } from '@chakra-ui/react';
import { ArrowSmDown } from '@styled-icons/heroicons-outline';
import CoinSwapContext from 'contexts/CoinSwapContext';
import CoinSelector from './CoinSelector';
import InputField from './InputField';
import NetworkSelector from './NetworkSelector';

const CoinSwapper = () => {
  const [
    { swapCoin, targetCoin, swapAmount, isLoadingTargetAmount },
    { updateTargetAmount },
  ] = useContext(CoinSwapContext);
  const { errorMessage, isValidInput, swapButtonEnabled } = useValidation();

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
