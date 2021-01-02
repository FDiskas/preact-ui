import { FunctionalComponent, h } from 'preact';
import { Route, Router, RouterOnChangeArgs } from 'preact-router';
import { Home } from '../routes/home';
import { Profile } from '../routes/profile';
import { Header } from './header/Header';
import { Speedometer } from './speedometer/Speedometer';

const App: FunctionalComponent = () => {
  let currentUrl: string;
  const handleRoute = (e: RouterOnChangeArgs) => {
    currentUrl = e.url;
    console.log(currentUrl);
  };

  // if ('alt' in window) {
  //   document.body.setAttribute('style', 'background-image: none');
  // }

  return (
    <div id="app">
      <Header />
      <Router onChange={handleRoute}>
        <Route default component={Home} />
        <Route path="/profile/" component={Profile} user="me" />
        <Route path="/profile/:user" component={Profile} />
      </Router>
      <Speedometer />
    </div>
  );
};

export default App;
