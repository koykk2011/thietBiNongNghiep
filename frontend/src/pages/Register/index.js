import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import InputForm from '~/components/InputForm';
import * as UserService from '~/service/UserService';
import { useMutationHooks } from '~/hooks/useMutationHook';
import Loading from '~/components/LoadingComponent';
import * as messages from '~/components/Message';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const cx = classNames.bind(styles);
function Register() {
    const navigate = useNavigate();
    const handleNavigateLogin = () => {
        navigate('/login');
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setComfirmPassword] = useState('');
    //thêm dữ liệu vào user bằng react query
    const mutation = useMutationHooks((data) => UserService.RegisterUser(data));
    const { data, isLoading, isSuccess, isError } = mutation;
    useEffect(() => {
        if (isSuccess && data?.status !== 'ERR') {
            messages.success('Đăng ký thành công');
            handleNavigateLogin();
        } else if (isError && data?.status === 'ERR') {
            messages.error('Đăng ký thất bại');
        }

    }, [isSuccess, isError]);
    //lấy dữ liệu từ in put
    const handleOnchangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnchangePassWord = (value) => {
        setPassword(value);
    };
    const handleOnchangeComfirmPassword = (value) => {
        setComfirmPassword(value);
    };
    const handleSignUp = () => {
        mutation.mutate({ email, password, confirmPassword });
    };
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-register')}>
                <div className={cx('title')}>
                    <h3 onClick={handleNavigateLogin} className={cx('title-register')}>
                        Đăng nhập
                    </h3>
                    <h3 className={cx('title-register')}>Đăng ký</h3>
                </div>
                <form method="post" action="">
                    <div className={cx('form-group')}>
                        <label htmlFor="email" className={cx('form-label')}>
                            Số điện thoại/Email
                        </label>
                        <div className={cx('form-input')}>
                            <InputForm
                                value={email}
                                onChange={handleOnchangeEmail}
                                type="email"
                                placeholder="Nhập số điện thoại hoặc email"
                                className={cx('form-control')}
                                id="email"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="password" className={cx('form-label')}>
                            Mật khẩu
                        </label>
                        <div className={cx('form-input')}>
                            <InputForm
                                value={password}
                                onChange={handleOnchangePassWord}
                                type={isShowPassword ? 'text' : 'password'}
                                placeholder="Nhập mật khẩu"
                                className={cx('form-control')}
                                id="password"
                            />
                        </div>
                        <span className={cx('eyes')} onClick={() => setIsShowPassword(!isShowPassword)}>
                            {isShowPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                        </span>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="re-password" className={cx('form-label')}>
                            Xác nhận mật khẩu
                        </label>
                        <div className={cx('form-input')}>
                            <InputForm
                                value={confirmPassword}
                                onChange={handleOnchangeComfirmPassword}
                                type={isShowPassword ? 'text' : 'password'}
                                placeholder="Xác nhận mật khẩu"
                                className={cx('form-control')}
                                id="re-password"
                            />
                        </div>
                        <span className={cx('eyes')} onClick={() => setIsShowPassword(!isShowPassword)}>
                            {isShowPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                        </span>
                    </div>
                </form>
                {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                <Loading isLoading={isLoading}>
                    <Button register className={cx('btn-register')} onClick={handleSignUp} disabled={email.length === 0}>
                        Đăng ký
                    </Button>
                </Loading>

                <span className={cx('text-ok')}>
                    Bằng việc đăng ký, bạn đã đồng ý với Nasa.com về
                    <p className={cx('text-dk')}>Điều khoản dịch vụ & Chính sách bảo mật</p>
                </span>
            </div>
        </div>
    );
}

export default Register;
