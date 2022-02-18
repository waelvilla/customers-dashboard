import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import RootNavigator from 'src/navigation';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </React.StrictMode>
  );
}
export default App;
