import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import logo from '~/assets/images/logo.png';
import logo2 from '~/assets/images/img/logo-bo-cong-thuong-da-thong-bao1.png';

import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx('wrapper1')}>
            <div className={cx('banner_ft')}></div>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <img className={cx('logo')} src={logo} alt="" />
                    <p className={cx('inner_map')}> Số 91, P.Khương Trung, Q.Thanh Xuân, TP.Hà Nội</p>
                    <p className={cx('inner_map')}>Công Ty Cổ Phần Nông Nghiệp - NASA</p>
                    <p className={cx('inner_node')}>
                        Nasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi ở tất cả Hệ Thống Nasa trên toàn quốc.
                    </p>
                    <div className={cx('logo2')}>
                        <img src={logo2} alt="" />
                    </div>
                </div>

                <div className={cx('wapper-right')}>
                    <div className={cx('right_top')}>
                        <div className={cx('item_top')}>
                            <h4>THÔNG TIN</h4>
                            <ul className={cx('item_ul')}>
                                <li className={cx('item_li')}>Điều khoản sử dụng</li>
                                <li className={cx('item_li')}>Chính sách bảo mật thông tin</li>
                                <li className={cx('item_li')}>Chính sách bảo mật thanh toán</li>
                                <li className={cx('item_li')}>Hệ thống trung tâm - Thiết bị </li>
                            </ul>
                        </div>
                        <div className={cx('item_top')}>
                            <h4>hỗ trợ</h4>
                            <ul className={cx('item_ul')}>
                                <li className={cx('item_li')}>Chính sách đổi - trả - hoàn tiền</li>
                                <li className={cx('item_li')}>Chính sách bảo hành - bồi hoàn</li>
                                <li className={cx('item_li')}>Chính sách vận chuyển</li>
                                <li className={cx('item_li')}>Phương thức thanh toán và xuất HĐ</li>
                            </ul>
                        </div>
                        <div className={cx('item_top')}>
                            <h4>DỊCH VỤ</h4>
                            <ul className={cx('item_ul')}>
                                <li className={cx('item_li')}>Đăng nhập/Tạo mới tài khoản</li>
                                <li className={cx('item_li')}>Thay đổi địa chỉ khách hàng</li>
                                <li className={cx('item_li')}>Lịch sử mua hàng</li>
                            </ul>
                        </div>
                    </div>

                    <div className={cx('call')}>
                        <h4>LIÊN HỆ</h4>
                        <div className={cx('call_list')}>
                            <p className={cx('call_item')}>
                                <FaMapMarkerAlt />
                                91 Khương Trung
                            </p>
                            <p className={cx('call_item', 'hehe')}>
                                <MdEmail />
                                cskh@nasa.com.vn
                            </p>
                            <p className={cx('call_item')}>
                                <BsFillTelephoneFill />
                                0332316616
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
