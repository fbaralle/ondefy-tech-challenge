import { Flex, Text } from '@chakra-ui/react';

const CoinSwapper = () => {
  return (
    <Flex
      w="500px"
      h="600px"
      borderRadius="10px"
      border="1px solid"
      borderColor="border.brandDecorative"
      padding={4}
      boxShadow="brand.drop"
    >
      <Text textStyle="body2Heavy">Content</Text>
    </Flex>
  );
};

export default CoinSwapper;
