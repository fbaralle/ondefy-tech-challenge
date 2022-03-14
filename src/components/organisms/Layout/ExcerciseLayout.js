import { ChevronDown } from '@styled-icons/heroicons-outline';
import { Flex, Heading, Image, Text, UnorderedList } from '@chakra-ui/react';
import ExampleImg from 'assets/img/example.png';

const ExcerciseLayout = ({ children }) => {
  return (
    <Flex
      backgroundColor="#1a242c"
      w="100%"
      h="100vh"
      padding={7}
      justifyContent="space-around"
    >
      <Flex
        w="40%"
        alignItems="flex-start"
        flexWrap="wrap"
        flexDirection="column"
      >
        <Heading as="h1" textStyle="body1">
          Welcome to the Ondefy onboarding process
        </Heading>
        <Heading as="h2" marginY={5} textStyle="title2Heavy">
          Your mission
        </Heading>
        <UnorderedList>
          <li>
            <Text>Create a react component from the following image</Text>
          </li>
          <li>
            <Text>Feel free to do it in the best way you think</Text>
          </li>
          <li>
            <Text>The component must be dynamic</Text>
          </li>
          <li>
            <Text>
              You will find tokens and networks data in the
              <Text color="txt.brand" as="span">
                {' data.js '}
              </Text>
              file
            </Text>
          </li>
          <li>
            <Flex
              justifyContent="flex-start"
              alignItems="center"
              flexWrap="wrap"
            >
              <Text>
                You can use
                <Text color="txt.brand" as="span">
                  {' heroicons '}
                </Text>
                to display icons
              </Text>
              <ChevronDown width="15px" height="15px" />
            </Flex>
          </li>
        </UnorderedList>

        <Image
          src={ExampleImg}
          alt="example"
          maxWidth="500px"
          height="auto"
          w="100%"
        />
      </Flex>
      <Flex w="40%" flexDirection="column">
        <Heading as="h2" mb={5}>
          Please display the result below
        </Heading>
        {children}
      </Flex>
    </Flex>
  );
};

export default ExcerciseLayout;
