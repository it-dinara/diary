import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import Diary from './containers/Diary'

function App(props) {
  return (
    <ThemeProvider theme={theme}>
        <Diary/>
    </ThemeProvider>
  );
}

export default App;
