import { Button } from '../../../../components/button';
import styles from './styles.module.scss';

export function Success({ passedLevel, onContinue }) {

  return (
    <div className={styles.success}>
      <p className={styles.done}>
        {`Уровень ${passedLevel} пройден`}
      </p>
      <p className={styles.nice}>
        Изумительно!
      </p>
      <Button onClick={onContinue}>Уровень 2</Button>
    </div>
  );
}
