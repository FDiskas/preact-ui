import { FunctionalComponent, h } from 'preact';
import styles from './style.scss';

export const Header: FunctionalComponent = () => {
  return (
    <header class={styles.header}>
      <div class={styles.wrapper} />
      <div class={styles.content}>
        <div class={styles.time}>
          <i class="far fa-clock" />
          16:45
        </div>
        <div>
          <h1>Server Name</h1>
        </div>
        <div class={styles.status}>
          <div>
            <i class="fas fa-cloud-sun-rain" />
            Sunny
          </div>
          <div>
            <i class="fas fa-wifi" />
            85
          </div>
          <div>
            <i class="far fa-user" />
            13
          </div>
        </div>
      </div>
    </header>
  );
};
