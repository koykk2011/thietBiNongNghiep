import styles from './NavbarComponent.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { Radio } from 'antd';

const cx = classNames.bind(styles);
function NavbarComponent(props) {
    const { onChange, className } = props;
    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => {
        setShowMore(true);
    };
    const handleShowLess = () => {
        setShowMore(false);
    };
    return (
        <div className={className}>
            <div className={cx('wrapper')}>
                <div className={cx('type-product')}>
                    <h3 className={cx('title')}>Nhóm thiết bị</h3>
                    <p className={cx('list')}>Tất cả nhóm thiết bị</p>
                    <div className={cx(`${cx('list-item')} ${showMore ? cx('show-more') : ''}`)}>
                        <p className={cx('item')}>Công cụ hỗ trợ cắt tỉa</p>
                        <p className={cx('item')}>Thiết bị máy móc</p>
                    </div>
                    <button className={`${cx('btn-category')} ${showMore ? cx('none-btn') : ''}`} onClick={handleShowMore}>
                        <span className={cx('btn-text')}>
                            Xem thêm
                            <AiOutlineDown />
                        </span>
                    </button>
                    <button className={`${cx('btn-category')} ${!showMore ? cx('none-btn') : ''}`} onClick={handleShowLess}>
                        <span className={cx('btn-text')}>
                            Rút gọn
                            <AiOutlineUp />
                        </span>
                    </button>
                </div>
                <div className={cx('title-price')}>Giá</div>
                <div className={cx('price-product')}>
                    <Radio.Group onChange={onChange}>
                        <div className={cx('list-price-product')}>
                            <span>
                                <Radio className={cx('box-price')} value={'0-150.000đ'}>
                                    0đ - 150.000đ
                                </Radio>
                            </span>
                            <span>
                                <Radio className={cx('box-price')} value={'150.000đ-300.000đ'}>
                                    150.000đ - 300.000đ
                                </Radio>
                            </span>
                            <span>
                                <Radio className={cx('box-price')} value={'300.000đ-500.000đ'}>
                                    300.000đ - 500.000đ
                                </Radio>
                            </span>
                            <span>
                                <Radio className={cx('box-price')} value={'500.000đ'}>
                                    500.000đ - trở lên
                                </Radio>
                            </span>
                        </div>
                    </Radio.Group>
                </div>
            </div>
        </div>
    );
}

export default NavbarComponent;
