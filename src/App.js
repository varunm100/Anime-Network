import logo from './logo.svg';
import './App.css';
import './Components/InfoCard.js';
import TreeGraph from './Components/TreeGraph.js';
import InfoCard from './Components/InfoCard';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <div className="App">
       <header className="App-header">
         <TreeGraph></TreeGraph>
       </header>
     </div>
    </ThemeProvider>
  );
}

export default App;
