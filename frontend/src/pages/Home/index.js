import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Banner from './Banner';
import ProductCard from '~/components/ProductCard';
import * as ProductService from '~/service/ProductService';
import * as CategoryService from '~/service/CategoryService';

import { useQuery } from 'react-query';
import Button from '~/components/Button';
import { ImgBanner } from '~/assets/images';
import ProductSale from '~/components/ProductSale';

const cx = classNames.bind(styles);

function Home() {
    const limit = 10;
    const page = 0;

    const fetchProductAll = async (context) => {
        const search = '';
        //lấy key số 1 trong mảng query
        const page = context?.queryKey && context?.queryKey[1];
        const limit = context?.queryKey && context?.queryKey[2];

        const res = await ProductService.getAllProducts(search, page, limit);
        return res;
    };
    const fecthProductsDiscount = async () => {
        const search = '';
        const res = await ProductService.getProductsDiscount(search);
        return res;
    }
    const { data: products } = useQuery(['products', page, limit], fetchProductAll, { retry: 3, retryDelay: 1000 });
    const getAllCategory = async () => {
        const res = await CategoryService.getAllCategory();
        return res;
    };
    const { data: productsDiscount } = useQuery(['productsDiscount', page, limit], fecthProductsDiscount, { retry: 3, retryDelay: 1000 });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Banner />
                <div className={cx('banner-img')}>
                    {ImgBanner.map((banner) => (
                        <img key={banner.iBanner} src={banner.iBanner} alt="" className={cx('banner-img-name')} />
                    ))}
                </div>

                <ProductSale />
                <div className={cx('category')}>
                    {productsDiscount?.data?.map((product) => {
                        return (
                            <ProductCard
                                key={product._id}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                pricesale={product.pricesale}
                                rating={product.rating}
                                sold={product.sold}
                                discount={product.discount}
                                countInStock={product.countInStock}
                                id={product._id}
                            />
                        );
                    })}
                </div>
                <div className={cx('product-top')}>
                    <div className={cx('top-sp')}>
                        <h3>XU HƯỚNG MUA SẮM</h3>
                    </div>
                    <div className={cx('list-product')}>
                        {products?.data.map((product) => {
                            return (
                                <ProductCard
                                    key={product._id}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    pricesale={product.pricesale}
                                    rating={product.rating}
                                    sold={product.sold}
                                    discount={product.discount}
                                    countInStock={product.countInStock}
                                    id={product._id}
                                />
                            );
                        })}
                    </div>
                    <Button register className={cx('btn-more')}>
                        Xem thêm
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;
