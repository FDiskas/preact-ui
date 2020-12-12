import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.module.css';

export const Notfound: FunctionalComponent = () => {
  return (
    <div class={style.notFound}>
      <h1>Error 404</h1>
      <p>That page doesn&apos;t exist.</p>
      <Link href="/">
        <h4>Back to Home</h4>
      </Link>
    </div>
  );
};
