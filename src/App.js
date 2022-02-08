import './App.css';
import Home from './components/page/Home';
import './css/index.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* displaying my home component as the default landing page */}
        
      <Route path="/" component={Home} exact />
  </Switch>
  </BrowserRouter>
  );
}

export default App;
