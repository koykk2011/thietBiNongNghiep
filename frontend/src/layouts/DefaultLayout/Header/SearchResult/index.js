import classNames from 'classnames/bind';
import styles from './SearchResult.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function SearchResult({ data }) {
    return (
        <Link>
            <div className={cx('wrapper')}>
                <img className={cx('produce')} src={data.image} alt="" />
                <div className={cx('info')}>
                    <p className={cx('name')}>{data.name} </p>
                    <div className={cx('price')}>
                        <span className={cx('current-price')}>{data.pricesale}</span>
                        <span className={cx('old-price')}>{data.price}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default SearchResult;
