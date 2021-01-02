import { FunctionalComponent, h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { deepEqual } from '../../helpers/equal';

import '../../helpers/utils';
import styles from './style.scss';

interface speedometerData {
  gear: number;
  rpm: number;
  speed: number;
  isElectric: boolean;
  isEngineRunning: boolean;
  isVehicleOnAllWheels: boolean;
  handbrakeActive: boolean;
  lightState: number;
  fuelPercentage: number;
  engineHealth: number;
  gearData?: { gearBefore: string; gearCurrent: string; gearNext: string };
}
export const Speedometer: FunctionalComponent = () => {
  const [isVisible, setDisplay] = useState(false);

  const [speedData, setData] = useState<speedometerData>({
    gear: 5,
    rpm: 9001,
    speed: 193,
    engineHealth: 200,
    fuelPercentage: 85,
    handbrakeActive: true,
    isElectric: false,
    isEngineRunning: true,
    isVehicleOnAllWheels: false,
    lightState: 2,
    gearData: { gearBefore: '-', gearCurrent: '-', gearNext: '-' },
  });

  useEffect(() => {
    window.alt.on('speedometer:data', updateData);
  }, [isVisible]);

  const updateData = (data: speedometerData) => {
    if (data) {
      data.gearData = getGearData(data.gear, data.speed);
      setData(data);
      if (!isVisible) {
        setDisplay(true);
      }
    } else {
      if (isVisible) {
        setDisplay(false);
      }
    }
  };

  const getNeedleRotation = () => {
    if (!speedData.isEngineRunning) {
      return 180;
    }
    const rpmPercent = (speedData.rpm / 10000) * 100;
    return Math.round((270 * rpmPercent) / 100) - 180;
  };

  const displayShiftUp = () => {
    let rpmPercent = (speedData.rpm / 10000) * 100;

    return rpmPercent > 90;
  };

  const getGearData = (currentGear: number, speed: number) => {
    const gearData = [
      { pre: '-', curr: 'R', next: 'P' }, // -1
      { pre: 'R', curr: 'P', next: '1' }, // 0
      { pre: '-', curr: '1', next: '2' }, // 1
      { pre: '1', curr: '2', next: '3' }, // 2
      { pre: '2', curr: '3', next: '4' }, // 3
      { pre: '3', curr: '4', next: '5' }, // 4
      { pre: '4', curr: '5', next: '6' }, // 5
      { pre: '5', curr: '6', next: '-' }, // 6
    ];

    let currentData = gearData[currentGear + 1];

    if (speed > 0 && currentGear === 0) {
      currentData = gearData[0];
    }

    return {
      gearBefore: currentData.pre,
      gearCurrent: currentData.curr,
      gearNext: currentData.next,
    };
  };

  const getLightStatus = () => {
    if (speedData.lightState === 0) {
      return '#424242';
    }
    if (speedData.lightState === 1) {
      return '#193a61';
    }
    return '#3b97ff';
  };

  const getFuelColor = () => {
    const colorData = {
      bg: 'var(--green)',
      color: 'var(--green)',
    };

    if (speedData.fuelPercentage < 30) {
      colorData.bg = 'var(--orange)';
      colorData.color = 'var(--orange)';
    }
    if (speedData.fuelPercentage < 10) {
      colorData.bg = 'var(--red)';
      colorData.color = 'var(--red)';
    }

    return colorData;
  };

  if (!isVisible) return null;

  return (
    <div
      class={styles.container}
      style={{ opacity: speedData.isEngineRunning ? 1 : 0.8 }}
    >
      <div class={styles.speedometer}>
        <div class={styles.line}>
          <div>
            <b>
              <span class={styles.num_1}>0</span>
            </b>
          </div>
          <div>
            <b />
          </div>
          <div>
            <b>
              <span class={styles.num_2}>1</span>
            </b>
          </div>
          <div>
            <b />
          </div>
          <div>
            <b>
              <span class={styles.num_3}>2</span>
            </b>
          </div>
          <div>
            <b />
          </div>
          <div>
            <b>
              <span class={styles.num_4}>3</span>
            </b>
          </div>
          <div>
            <b />
          </div>
          <div>
            <b>
              <span class={styles.num_5}>4</span>
            </b>
          </div>
          <div>
            <b />
          </div>
          <div>
            <b>
              <span class={styles.num_6}>5</span>
            </b>
          </div>
          <div>
            <b />
          </div>
          <div>
            <b>
              <span class={styles.num_7}>6</span>
            </b>
          </div>
          <div>
            <b />
          </div>
          <div>
            <b>
              <span class={styles.num_8}>7</span>
            </b>
          </div>
          <div>
            <b />
          </div>
          <div>
            <b>
              <span class={styles.num_9}>8</span>
            </b>
          </div>
          <div>
            <b />
          </div>
          <div>
            <b>
              <span class={styles.num_10}>9</span>
            </b>
          </div>
          <div>
            <b />
          </div>
          <div>
            <b>
              <span class={styles.num_11}>10</span>
            </b>
          </div>
        </div>
        <div
          class={styles.needle}
          style={{
            transform: `rotate(${getNeedleRotation()}deg)`,
          }}
        />
        <div class={styles.pin}>
          {speedData.isEngineRunning && (
            <Fragment>
              <div class={styles.gearBefore}>
                {speedData.gearData?.gearBefore}
              </div>
              <div class={styles.gearCurrent}>
                {speedData.gearData?.gearCurrent}
              </div>
              <div class={styles.gearNext}>{speedData.gearData?.gearNext}</div>
            </Fragment>
          )}
        </div>
        {speedData.isEngineRunning && (
          <div class={styles.kmh}>
            <div class={styles.speed}>{speedData.speed}</div>
            <div>km/h</div>
          </div>
        )}
        {speedData.isEngineRunning && (
          <Fragment>
            {displayShiftUp() && (
              <div>
                <i class={`${styles.shift} fas fa-caret-up`} />
              </div>
            )}
            {speedData.handbrakeActive && (
              <div>
                <i class={`${styles.handbrake} fas fa-exclamation`} />
              </div>
            )}
            {!speedData.isVehicleOnAllWheels && (
              <div>
                <i class={`${styles.inair} fas fa-bacon`} />
              </div>
            )}
            <div>
              <i
                class={`${styles.lightsOn} fas fa-lightbulb`}
                style={{
                  color: getLightStatus(),
                }}
              />
            </div>
            <div class={styles.fuel}>
              <div class={styles.fuelbar}>
                <div
                  style={{
                    height: `${speedData.fuelPercentage}%`,
                    backgroundColor: getFuelColor().bg,
                  }}
                />
              </div>
              <div>
                <i
                  class="fas fa-gas-pump"
                  style={{ color: getFuelColor().color }}
                />
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};
