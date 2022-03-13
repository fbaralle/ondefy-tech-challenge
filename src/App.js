import ExcerciseLayout from 'components/organisms/Layout/ExcerciseLayout';
import CoinSwapper from 'components/organisms/CoinSwapper';
import DesignSystem from 'components/organisms/Layout/DesignSystem';
import { CoinSwapProvider } from 'contexts/CoinSwapContext';

const App = () => {
  return (
    <div className="App">
      <DesignSystem>
        <ExcerciseLayout>
          <CoinSwapProvider>
            <CoinSwapper />
          </CoinSwapProvider>
        </ExcerciseLayout>
      </DesignSystem>
    </div>
  );
};

export default App;
