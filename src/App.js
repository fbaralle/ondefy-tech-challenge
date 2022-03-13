import ExcerciseLayout from 'components/organisms/Layout/ExcerciseLayout';
import CoinSwapper from 'components/organisms/CoinSwapper';
import DesignSystem from 'components/organisms/Layout/DesignSystem';

const App = () => {
  return (
    <div className="App">
      <DesignSystem>
        <ExcerciseLayout>
          <CoinSwapper />
        </ExcerciseLayout>
      </DesignSystem>
    </div>
  );
};

export default App;
