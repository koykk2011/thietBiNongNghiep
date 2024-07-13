import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import styles from './User.module.scss';
import { BsFileText } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';

import { HiUserCircle } from 'react-icons/hi';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import * as UserService from '~/service/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '~/redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loading from '~/components/LoadingComponent';

const cx = classNames.bind(styles);

function User({ children, items = [] }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleNavigateLogin = () => {
        navigate('/login');
    };

    const handleLogout = async () => {
        setLoading(true);
        await UserService.logOutUser();
        dispatch(resetUser());
        localStorage.clear();
        window.location.reload();
        setLoading(false);
    };
    return (
        <div>
            <Loading isLoading={loading}>
                <Tippy
                    delay={[0, 500]}
                    placement="bottom-end"
                    interactive
                    render={(attrs) => (
                        <div className={cx('list-users')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                {user?.access_token && user.isAdmin && (
                                    <>
                                        <Button to="/system/admin" className={cx('btn')}>
                                            Quản lý
                                        </Button>
                                    </>
                                )}
                                {user?.access_token ? (
                                    <>
                                        <Button leftIcon={<HiUserCircle />} className={cx('btn')} onClick={() => navigate('/profile')}>
                                            Thông tin  tài khoản
                                        </Button>
                                        <Button
                                            leftIcon={<BsFileText />}
                                            onClick={() =>
                                                navigate('/my_order', {
                                                    state: {
                                                        id: user?.id,
                                                        token: user?.access_token,
                                                    },
                                                })
                                            }
                                            className={cx('btn')}
                                        >
                                            Đơn hàng của tôi
                                        </Button>
                                        <Button leftIcon={<CiLogout />} className={cx('btn')} onClick={() => handleLogout()}>
                                            Thoát tài khoản
                                        </Button>
                                    </>
                                ) : (
                                    <div className={cx('user-items')}>
                                        <Button onClick={handleNavigateLogin} login className={cx('loggin')}>
                                            Đăng nhập
                                        </Button>
                                        <Button register>Đăng ký</Button>
                                    </div>
                                )}
                            </PopperWrapper>
                        </div>
                    )}
                >
                    {children}
                </Tippy>
            </Loading>
        </div>
    );
}

export default User;
