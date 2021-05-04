import styles from './styles.module.scss';

type SubscribeButtonProps = {
  priceId: string;
};

export default function SubscribeButton({ priceId }: SubscribeButtonProps) {
  return (
    <button type='button' className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
}
