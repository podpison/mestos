import './App.css';
import HeaderContainer from './components/header/HeaderContainer';
import MainContentContainer from './components/mainContent/MainContentContainer';
import { StylesProvider } from '@material-ui/core/styles';
import { useEffect } from 'react';

type Props = {
  initializeUser: () => void
};

function App({ initializeUser }: Props) {

  useEffect(() => {
    initializeUser();
    //eslint-disable-next-line
  }, [])

  return (
    <StylesProvider injectFirst>
      <div className='app'>
        <div className='wrapper'>
          <HeaderContainer />
          <MainContentContainer />
        </div>
      </div>
    </StylesProvider>
  );
}

export default App;
