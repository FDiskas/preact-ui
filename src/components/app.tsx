import { FunctionalComponent, h } from 'preact';
import { Route, Router, RouterOnChangeArgs } from 'preact-router';

import NotFoundPage from '../routes/notfound';
import { Header } from './header/Header';
import Home from 'src/routes/home';
import Profile from 'src/routes/profile';

const App: FunctionalComponent = () => {
  let currentUrl: string;
  const handleRoute = (e: RouterOnChangeArgs) => {
    currentUrl = e.url;
  };

  return (
    <div id="app">
      <Header />
      <Router onChange={handleRoute}>
        <Route path="/" component={Home} />
        <Route path="/profile/" component={Profile} user="me" />
        <Route path="/profile/:user" component={Profile} />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

export default App;
