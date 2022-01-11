import './App.css';
import Home from './components/Home';
import './css/index.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact />
  </Switch>
  </BrowserRouter>
  );
}

export default App;
