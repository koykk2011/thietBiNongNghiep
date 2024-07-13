import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { BsBell } from 'react-icons/bs';
import styles from './Bell.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function Bell({ children }) {
    const navigate = useNavigate();
    const handleNavigateLogin = () => {
        navigate('/login');
    };
    const user = useSelector((state) => state.user);

    return (
        <div>
            <Tippy
                delay={[0, 500]}
                placement="bottom-end"
                interactive
                render={(attrs) => (
                    <div className={cx('list-bells')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {user?.access_token ? (
                                <div>chúc mừng bạn đăng nhập thành công</div>
                            ) : (
                                <div className={cx('bell-items')}>
                                    <span className={cx('bell-text')}>
                                        <BsBell />
                                        Đăng nhập để nhận thông báo!
                                    </span>
                                </div>
                            )}
                        </PopperWrapper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Bell;
