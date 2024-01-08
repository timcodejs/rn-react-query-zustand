import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Routes from './src/Screens/Routes';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} edges={['left', 'right']}>
        <Routes />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
