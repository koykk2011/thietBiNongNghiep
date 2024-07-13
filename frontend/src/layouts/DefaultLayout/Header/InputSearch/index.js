import { Wrapper as PopperWrapper } from '~/components/Popper';
import SearchResult from '~/layouts/DefaultLayout/Header/SearchResult';
import Tippy from '@tippyjs/react/headless';
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './InputSearch.module.scss';
import { useDispatch } from 'react-redux';
import { searchProduct } from '~/redux/slides/ProductSlide';
import { useNavigate } from 'react-router-dom';
import useDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

function InputSearch() {
    const navigate = useNavigate();
    const handleNavigateSearch = () => {
        setShowResult(false);
        navigate('/search');
    };
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const debounced = useDebounce(searchValue, 500);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            setSearchValue('');
            return;
        }
        fetch(`http://localhost:3003/api/product/getall?filter=name&filter=${debounced}`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data);
            });
    }, [debounced]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const onSearch = (e) => {
        setSearchValue(e.target.value);
        dispatch(searchProduct(e.target.value));
    };

    return (
        <div key="uniqueId1">
            <Tippy
                placement="bottom"
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Sản phẩm liên quan</h4>
                            {searchResult.map((result) => (
                                <SearchResult key={result._id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input value={searchValue || ''} onChange={onSearch} onFocus={() => setShowResult(true)} placeholder="Tìm kiếm thiết bị mong muốn ..." />
                    <button className={cx('search-btn')} onClick={handleNavigateSearch}>
                        <AiOutlineSearch />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default InputSearch;
