import s from './LoadMoreButton.module.css';

const LoadMoreButton = ({ loadMore }) => {
  return (
    <button onClick={loadMore} className={s.loadMore} type="button">
      LOAD MORE
    </button>
  );
};

export default LoadMoreButton;
