import { useContext } from 'react';
import { GlobeAlt, ChevronDown } from '@styled-icons/heroicons-outline';
import { Flex, Select, Text, Image, Skeleton, Spinner } from '@chakra-ui/react';
import CoinSwapContext from 'contexts/CoinSwapContext';

const NetworkSelector = () => {
  const [
    { selectedNetwork, isLoadingNetworksList, networksList },
    { updateSelectedNetwork },
  ] = useContext(CoinSwapContext);

  const onChangeHandler = (selectedNetworkId) => {
    const [selectedNetworkData] = networksList.filter(
      (net) => net.networkKey === selectedNetworkId
    );
    return updateSelectedNetwork(selectedNetworkData);
  };

  return (
    <Flex flexDirection="column">
      <Text textColor="txt.muted" textStyle="body1Heavy" mb={2}>
        Network
      </Text>

      <Flex alignItems="center" justifyContent="center">
        <Flex
          alignItems="center"
          justifyContent="center"
          width="28px"
          height="28px"
        >
          {isLoadingNetworksList ? (
            <Spinner size="md" thickness="2px" />
          ) : (
            selectedNetwork?.logoURI && (
              <Image
                w="100%"
                h="100%"
                borderRadius="15px"
                src={selectedNetwork.logoURI}
                alt={`${selectedNetwork.name} network icon`}
                fallback={<GlobeAlt width="28px" height="28px" />}
              />
            )
          )}
        </Flex>
        <Skeleton isLoaded={!isLoadingNetworksList} borderRadius="15px">
          <Select
            isDisabled={isLoadingNetworksList}
            border="0px"
            placeholder="- Network -"
            onChange={(e) => onChangeHandler(e.target.value)}
            textStyle="title1Heavy"
            fontSize="xl"
            maxWidth="180px"
            padding="0px"
            mt={1}
            icon={<ChevronDown width="20px" height="20px" />}
          >
            {networksList.length > 0 &&
              networksList.map((network) => (
                <option key={network.networkKey} value={network.networkKey}>
                  {network.name}
                </option>
              ))}
          </Select>
        </Skeleton>
      </Flex>
    </Flex>
  );
};

export default NetworkSelector;
