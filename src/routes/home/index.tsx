import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router';
import style from './style.css';

export const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>This is the Home component.</p>
      <Link href="/profile">Me</Link>
    </div>
  );
};
