import { useContext } from 'react';
import { GlobeAlt, ChevronDown } from '@styled-icons/heroicons-outline';
import { Flex, Select, Text, Image, Skeleton, Spinner } from '@chakra-ui/react';
import CoinSwapContext from 'contexts/CoinSwapContext';

const CoinSelector = ({ isTarget = false }) => {
  const [
    { swapCoin, targetCoin, isLoadingCoinsList, coinsList },
    { updateSwapCoin, updateTargetCoin },
  ] = useContext(CoinSwapContext);

  const title = isTarget ? 'Swap to' : 'Swap from';
  const selectedCoin = isTarget ? targetCoin : swapCoin;

  const onChangeHandler = (selectedCoinId) => {
    const [selectedCoinData] = coinsList.filter(
      (coin) => coin.id === selectedCoinId
    );
    const updateAction = isTarget ? updateTargetCoin : updateSwapCoin;
    return updateAction(selectedCoinData);
  };

  return (
    <Flex flexDirection="column">
      <Text textColor="txt.muted" textStyle="body1Heavy" mb={2}>
        {title}
      </Text>

      <Flex alignItems="center" justifyContent="center">
        <Flex
          alignItems="center"
          justifyContent="center"
          width="28px"
          height="28px"
        >
          {isLoadingCoinsList ? (
            <Spinner size="md" thickness="2px" />
          ) : (
            selectedCoin?.logoURI && (
              <Image
                w="100%"
                h="100%"
                borderRadius="15px"
                src={selectedCoin.logoURI}
                alt={`${selectedCoin.label} token icon`}
                fallback={<GlobeAlt width="28px" height="28px" />}
              />
            )
          )}
        </Flex>
        <Skeleton isLoaded={!isLoadingCoinsList} borderRadius="15px">
          <Select
            isDisabled={isLoadingCoinsList}
            border="0px"
            placeholder="- Token -"
            onChange={(e) => onChangeHandler(e.target.value)}
            textStyle="title1Heavy"
            fontSize="xl"
            maxWidth="140px"
            mt={1}
            icon={<ChevronDown width="20px" height="20px" />}
          >
            {coinsList.length > 0 &&
              coinsList.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.symbol}
                </option>
              ))}
          </Select>
        </Skeleton>
      </Flex>
    </Flex>
  );
};

export default CoinSelector;
