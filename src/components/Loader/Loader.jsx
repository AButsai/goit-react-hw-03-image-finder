import { Rings } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.spinner}>
      <Rings color="#3f51b5" height={100} width={100} />
    </div>
  );
};

export default Loader;
