import classNames from 'classnames/bind';

import styles from './SearchPage.module.scss';
import ProductCard from '~/components/ProductCard';
import * as ProductService from '~/service/ProductService';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from '~/components/LoadingComponent';
import NavbarComponent from '~/components/NavbarComponent';
import useDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

function SearchPage() {
    const [loading, setLoading] = useState(false);
    const fetchProductAll = async (search) => {
        setLoading(true);
        const res = await ProductService.getAllProducts(search);
        if (search.length > 0) {
            setStateProduct(res?.data);
            setLoading(false);
        } else {
            setLoading(false);
            return res;
        }
    };
    const { data: products, isLoading } = useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 });
    const searchProduct = useSelector((state) => state?.product?.search);
    const [stateProduct, setStateProduct] = useState([]);
    const searchDebounce = useDebounce(searchProduct, 500);
    useEffect(() => {
        if (!searchProduct) {
            return;
        } else if (searchDebounce === '') {
            return;
        }
        fetchProductAll(searchProduct);
    }, [searchProduct, searchDebounce]);

    useEffect(() => {
        if (products?.data?.length > 0) {
            setStateProduct(products?.data);
        }
    }, [products]);

    const handleNavbar = (e) => {
        const value = e.target.value;
        let arr;
        if (value === '0-150.000đ') {
            arr = products?.data.filter((item) => {
                return Math.trunc(item.price - (item.price * item.discount) / 100) <= 150000;
            });
            setStateProduct(arr);
        } else if (value === '150.000đ-300.000đ') {
            arr = products?.data.filter((item) => {
                return Math.trunc(item.price - (item.price * item.discount) / 100) > 150000 && Math.trunc(item.price - (item.price * item.discount) / 100) < 300000;
            });
            setStateProduct(arr);
        } else if (value === '300.000đ-500.000đ') {
            arr = products?.data.filter((item) => {
                return Math.trunc(item.price - (item.price * item.discount) / 100) > 300000 && Math.trunc(item.price - (item.price * item.discount) / 100) < 500000;
            });
            setStateProduct(arr);
        } else if (value === '500.000đ') {
            arr = products?.data.filter((item) => {
                return Math.trunc(item.price - (item.price * item.discount) / 100) >= 500000;
            });
            setStateProduct(arr);
        }
    };

    return (
        <Loading isLoading={isLoading || loading}>
            <h2 className={cx('wrapper')}>
                <NavbarComponent className={cx('navbar')} onChange={handleNavbar} />
                <div className={cx('inner')}>
                    <div className={cx('list-product')}>
                        {stateProduct?.map((product) => {
                            return (
                                <ProductCard
                                    className={cx('search-product')}
                                    key={product._id}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    sold={product.sold}
                                    discount={product.discount}
                                    chapter={product.chapter}
                                    countInStock={product.countInStock}
                                    id={product._id}
                                />
                            );
                        })}
                    </div>
                </div>
            </h2>
        </Loading>
    );
}

export default SearchPage;
