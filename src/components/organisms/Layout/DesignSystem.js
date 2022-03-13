import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import fonts from 'components/theme/fonts';
import theme from 'components/theme';

const DesignSystem = ({ children }) => (
  <ChakraProvider theme={theme} resetCSS>
    <Global styles={fonts} />
    {children}
  </ChakraProvider>
);

export default DesignSystem;
