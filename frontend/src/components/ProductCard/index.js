import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Rate } from 'antd';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { convertPrice } from '~/ultil';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function ProductCard(props) {
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 17,
        borderRadius: 10,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: '#eda6a6',
        },
        [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: '#d22121',
        },
    }));

    const { image, name, price, pricesale, rating, sold, discount, id, countInStock, ...rests } = props;
    const navigate = useNavigate();
    const handleDetailProduct = () => {
        navigate(`/product/${id}`);
    };
    const priceSale = Math.trunc(price - (price * discount) / 100);

    return (
        <div className={cx('wrapper')} {...rests}>
            <div className={cx('product-item-img')} onClick={() => handleDetailProduct(id)}>
                <img className={cx('product-img')} src={image} alt="" />
                {countInStock === 0 && (
                    <div className={cx('overlays')}>
                        <img src={images.notBuy} alt="hethang" className={cx('not-buy')} />
                    </div>
                )}
                {discount !== 0 && <div className={cx('discount')}>{discount}%</div>}
            </div>
            <div className={cx('product-des')}>
                <p className={cx('product-name')}>{name}</p>
                <div className={cx('price')}>
                    <div className={cx('product-price')}>
                        <span className={cx('current-price')}>{convertPrice(priceSale)}</span>
                    </div>
                    {discount !== 0 && <div className={cx('old-price')}>{convertPrice(price)}</div>}
                </div>
                {rating >= 0 && (
                    <div className={cx('rating')}>
                        <Rate style={{ fontSize: '1.4rem' }} className={cx('rate')} allowHalf disabled value={rating} />

                        <span className={cx('rate-text')}>({rating})</span>
                    </div>
                )}
            </div>
            {sold >= 0 && (
                <div className={cx('progress')}>
                    <BorderLinearProgress variant="determinate" value={sold} />
                    <span className={cx('progress-text')}> Đã bán {sold}</span>
                </div>
            )}
        </div>
    );
}

export default ProductCard;
