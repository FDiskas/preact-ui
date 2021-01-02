import { FunctionalComponent, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import styles from './style.module.scss';

export const Header: FunctionalComponent = () => {
  const [time, setTime] = useState<number>(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(Date.now()), 1000);

    // gets called just before navigating away from the route
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <header class={styles.header}>
      <div class={styles.wrapper} />
      <div class={styles.content}>
        <div class={styles.time}>
          <i class="far fa-clock" />
          {new Date(time).toLocaleTimeString('lt-LT')}
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
