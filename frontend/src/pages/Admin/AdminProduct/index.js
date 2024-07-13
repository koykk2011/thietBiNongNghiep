import { Button as But } from 'antd/es/radio';
import Button from '~/components/Button';
import { IoMdAddCircleOutline } from 'react-icons/io';
import classNames from 'classnames/bind';
import style from './AdminProduct.module.scss';
import TableComponent from '../ComponentAdmin/TableComponent';
import { Modal, Upload, Button as BTN, Input, Space, Select } from 'antd';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

import { useRef, useState } from 'react';
import { getBase64, renderOptions } from '~/ultil';
import { useMutationHooks } from '~/hooks/useMutationHook';
import * as ProductService from '~/service/ProductService';
import { useEffect } from 'react';
import * as messages from '~/components/Message';
import { useQuery } from 'react-query';
import DrawerComponent from '../ComponentAdmin/DrawerComponent';
import { useSelector } from 'react-redux';
import Loading from '~/components/LoadingComponent';
import ModalComponent from '../ComponentAdmin/ModalComponent';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
const cx = classNames.bind(style);
function AdminProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const initial = () => ({
        name: '',
        image: '',
        type: '',
        category: '',
        sold: '',
        price: '',
        pricesale: '',
        countInStock: '',
        rating: '',
        description: '',
        discount: '',
        newType: '',
        supplier: '',
    });
    const [stateProduct, setStateProduct] = useState(initial());

    //thêm dữ liệu vào Product bằng react query
    const mutation = useMutationHooks((data) => {
        const { name, image, type, category, sold, price, pricesale, countInStock, rating, description, discount, supplier } = data;
        console.log('dataa', data)
        const res = ProductService.createProduct({
            name,
            image,
            type,
            category,
            sold,
            price,
            pricesale,
            countInStock,
            rating,
            description,
            discount,
            supplier,
        });
        return res;
    });
    const { data, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            messages.success('thêm thành công');
            handleCancel();
        } else if (isError && data?.status === 'ERR') {
            messages.error('thêm thất bại');
        }
    }, [isSuccess, isError]);

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            image: '',
            type: '',
            category: '',
            sold: '',
            price: '',
            pricesale: '',
            countInStock: '',
            rating: '',
            description: '',
            discount: '',
            supplier: '',

        });
    };
    const handleOnfinish = () => {
        const params = {
            name: stateProduct.name,
            image: stateProduct.image,
            type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
            category: stateProduct.category,
            sold: stateProduct.sold,
            price: stateProduct.price,
            pricesale: stateProduct.pricesale,
            countInStock: stateProduct.countInStock,
            rating: stateProduct.rating,
            description: stateProduct.description,
            discount: stateProduct.discount,
            supplier: stateProduct.supplier,
        };
        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch();
            },
        });
        handleCancel();
    };
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        });
    };

    //adllType
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        return res;
    };
    const handleOnChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value,
        });
    };
    //Get All Product
    const getAllProduct = async () => {
        const res = await ProductService.getAllProducts();
        return res;
    };
    const queryProduct = useQuery(['products'], getAllProduct);
    const typeProduct = useQuery(['type-products'], fetchAllTypeProduct);
    const { isLoading: isLoadingProduct, data: products } = queryProduct;
    const renderAction = () => {
        return (
            <div>
                <AiOutlineDelete style={{ fontSize: '3rem' }} onClick={() => setIsModalOpenDelete(true)} />
                <AiOutlineEdit style={{ fontSize: '3rem' }} onClick={handleDetailProduct} />
            </div>
        );
    };

    //Update
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const user = useSelector((state) => state?.user);
    const [stateProductDetail, setStateProductDetail] = useState(initial());

    const handleOnChangeDetail = (e) => {
        setStateProductDetail({
            ...stateProductDetail,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnChangeAvatarDetail = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetail({
            ...stateProductDetail,
            image: file.preview,
        });
    };

    const fetchGetProductDetail = async (rowSelected) => {
        const res = await ProductService.getDetailProduct(rowSelected);
        if (res?.data) {
            setStateProductDetail({
                name: res?.data?.name,
                image: res?.data?.image,
                type: res?.data?.type,
                category: res?.data?.category,
                sold: res?.data?.sold,
                price: res?.data?.price,
                pricesale: res?.data?.pricesale,
                countInStock: res?.data?.countInStock,
                rating: res?.data?.rating,
                description: res?.data?.description,
                discount: res?.data?.discount,
                supplier: res?.data?.supplier,

            });
        }
    };

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            fetchGetProductDetail(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);
    const handleDetailProduct = () => {
        if (rowSelected) {
        }
        setIsOpenDrawer(true);
    };
    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rest } = data;
        const res = ProductService.updateProduct(id, token, { ...rest });
        return res;
    });
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetail({
            name: '',
            image: '',
            type: '',
            category: '',
            sold: '',
            price: '',
            pricesale: '',
            countInStock: '',
            rating: '',
            description: '',
            discount: '',
            supplier: '',
        });
    };
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isErrorUpdated } = mutationUpdate;

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            messages.success('Cập nhật thành công');
            handleCloseDrawer();
        } else if (isErrorUpdated && dataUpdated?.status === 'ERR') {
            messages.error('Cập nhật thất bại');
        }
    }, [isSuccessUpdated, isErrorUpdated]);

    const handleOnUpdate = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateProductDetail },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };
    //Delete
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };
    const mutationDelete = useMutationHooks((data) => {
        const { id, token } = data;
        const res = ProductService.deleteProduct(id, token);
        return res;
    });
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isErrorDeleted } = mutationDelete;

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            messages.success('Xóa thành công');
            handleCancelDelete();
        } else if (isErrorDeleted && dataDeleted?.status === 'ERR') {
            messages.error('Xóa thất bại');
        }
    }, [isSuccessDeleted, isErrorDeleted]);

    const handleDeleteProduct = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };
    //Delete Many
    const mutationDeleteMany = useMutationHooks((data) => {
        const { token, ...ids } = data;
        const res = ProductService.deleteManyProduct(ids, token);
        return res;
    });
    const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isErrorDeletedMany } = mutationDeleteMany;

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            messages.success('Xóa thành công');
            handleCancelDelete();
        } else if (isErrorDeletedMany && dataDeletedMany?.status === 'ERR') {
            messages.error('Xóa thất bại');
        }
    }, [isSuccessDeleted, isErrorDeleted]);

    const handleDeleteManyProduct = (ids) => {
        mutationDeleteMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };

    //Search
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <BTN
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </BTN>
                    <BTN
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </BTN>
                    <BTN
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </BTN>
                    <BTN
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </BTN>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#fff',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    //columns data
    const columns = [
        {
            title: 'Tên thiết bị',
            dataIndex: 'name',
            width: 350,
            render: (text) => <span>{text}</span>,
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>= 100',
                    value: '>=',
                },
                {
                    text: '<= 100',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 100;
                } else if (value === '<=') {
                    return record.price <= 100;
                }
            },
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            sorter: (a, b) => a.type.length - b.type.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const dataTable =
        products?.data?.length &&
        products?.data?.map((product) => {
            return { ...product, key: product._id };
        });

    return (
        <div className={cx('wrapper')}>
            <div>Quản lý thiết bị</div>
            <But className={cx('btn-add')} onClick={() => setIsModalOpen(true)}>
                <IoMdAddCircleOutline className={cx('icon-add')} />
            </But>
            <div>
                <TableComponent
                    handleDeleteMany={handleDeleteManyProduct}
                    columns={columns}
                    data={dataTable}
                    isLoading={isLoadingProduct}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record?._id);
                            },
                        };
                    }}
                />
            </div>
            <Modal title="" open={isModalOpen} onCancel={handleCancel} footer={null} width="80%">
                <form method="post" action="">
                    <div className={cx('form-group')}>
                        <label htmlFor="name" className={cx('form-label')}>
                            Tên thiết bị
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.name}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Nhập tên thiết bị"
                                className={cx('form-control')}
                                id="name"
                                name="name"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group-select')}>
                        <label htmlFor="type" className={cx('form-label')}>
                            Loại
                        </label>
                        <div className={cx('form-input-select')}>
                            <Select
                                placeholder="Select a person"
                                value={stateProduct.type}
                                className={cx('form-control-select')}
                                name="type"
                                onChange={handleOnChangeSelect}
                                options={renderOptions(typeProduct?.data?.data)}
                            />
                        </div>
                    </div>
                    {stateProduct?.type === 'add_type' && (
                        <div className={cx('form-group-select')}>
                            <label htmlFor="type" className={cx('form-label')}></label>
                            <div className={cx('form-input-select')}>
                                <input
                                    value={stateProduct.newType}
                                    onChange={handleOnChange}
                                    type="text"
                                    placeholder="Nhập Type"
                                    className={cx('form-control-input')}
                                    id="type"
                                    name="newType"
                                />
                            </div>
                        </div>
                    )}
                    <div className={cx('form-group')}>
                        <label htmlFor="sold" className={cx('form-label')}>
                            Đã bán
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.sold}
                                onChange={handleOnChange}
                                name="sold"
                                type="number"
                                placeholder="Nhập đã bán"
                                className={cx('form-control')}
                                id="sold"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="price" className={cx('form-label')}>
                            Giá
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.price}
                                onChange={handleOnChange}
                                name="price"
                                type="number"
                                placeholder="Nhập giá"
                                className={cx('form-control')}
                                id="price"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="pricesale" className={cx('form-label')}>
                            Giá giảm
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.pricesale}
                                onChange={handleOnChange}
                                name="pricesale"
                                type="number"
                                placeholder="Nhập giá giảm"
                                className={cx('form-control')}
                                id="pricesale"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="countInStock" className={cx('form-label')}>
                            Số lượng tồn
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.countInStock}
                                onChange={handleOnChange}
                                name="countInStock"
                                type="number"
                                placeholder="Nhập số lượng tồn"
                                className={cx('form-control')}
                                id="countInStock"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="rating" className={cx('form-label')}>
                            Đánh giá
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.rating}
                                onChange={handleOnChange}
                                name="rating"
                                type="number"
                                placeholder="Nhập rating"
                                className={cx('form-control')}
                                id="rating"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="supplier" className={cx('form-label')}>
                            Nhà cung cấp
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.supplier}
                                onChange={handleOnChange}
                                name="supplier"
                                type="text"
                                placeholder="Nhập nhà cung cấp"
                                className={cx('form-control')}
                                id="supplier"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="discount" className={cx('form-label')}>
                            Giảm giá
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.discount}
                                onChange={handleOnChange}
                                name="discount"
                                type="text"
                                placeholder="Nhập phần trăm giảm"
                                className={cx('form-control')}
                                id="discount"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="description" className={cx('form-label')}>
                            Mô tả
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.description}
                                onChange={handleOnChange}
                                name="description"
                                type="text"
                                placeholder="Nhập mô tả"
                                className={cx('form-control')}
                                id="description"
                            />
                        </div>
                    </div>
                    <div className={cx('form-input-avatar')}>
                        <Upload onChange={handleOnChangeAvatar} className={cx('ant-upload-list-item.ant-upload-list-item-error')} maxCount={1}>
                            <BTN>Select File</BTN>
                        </Upload>
                        {stateProduct?.image && <img src={stateProduct?.image} className={cx('input-avatar')} alt="avatar" />}
                    </div>
                </form>
                <Button login className={cx('btn-save')} onClick={handleOnfinish}>
                    Lưu
                </Button>
            </Modal>
            <DrawerComponent isOpen={isOpenDrawer} title="Cập nhật Sản Phẩm" onClose={() => setIsOpenDrawer(false)} width="80%">
                <Loading isLoading={isLoadingUpdated}>
                    <form method="post" action="">
                        <div className={cx('form-group')}>
                            <label htmlFor="name" className={cx('form-label')}>
                                Tên thiết bị
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.name}
                                    onChange={handleOnChangeDetail}
                                    type="text"
                                    placeholder="Nhập tên thiết bị"
                                    className={cx('form-control')}
                                    id="name"
                                    name="name"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="type" className={cx('form-label')}>
                                Loại
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.type}
                                    onChange={handleOnChangeDetail}
                                    type="text"
                                    placeholder="Nhập loại"
                                    className={cx('form-control')}
                                    id="type"
                                    name="type"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="category" className={cx('form-label')}>
                                Loại thiết bị
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.category}
                                    onChange={handleOnChangeDetail}
                                    type="text"
                                    placeholder="Loại thiết bị"
                                    className={cx('form-control')}
                                    id="category"
                                    name="category"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="sold" className={cx('form-label')}>
                                Đã bán
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.sold}
                                    onChange={handleOnChangeDetail}
                                    name="sold"
                                    type="number"
                                    placeholder="Nhập đã bán"
                                    className={cx('form-control')}
                                    id="sold"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="price" className={cx('form-label')}>
                                Giá tiền
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.price}
                                    onChange={handleOnChangeDetail}
                                    name="price"
                                    type="number"
                                    placeholder="Nhập giá"
                                    className={cx('form-control')}
                                    id="price"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="pricesale" className={cx('form-label')}>
                                Giá giảm
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.pricesale}
                                    onChange={handleOnChangeDetail}
                                    name="pricesale"
                                    type="number"
                                    placeholder="Nhập giá giảm"
                                    className={cx('form-control')}
                                    id="pricesale"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="countInStock" className={cx('form-label')}>
                                Số lượng tồn
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.countInStock}
                                    onChange={handleOnChangeDetail}
                                    name="countInStock"
                                    type="number"
                                    placeholder="Nhập số lượng tồn"
                                    className={cx('form-control')}
                                    id="countInStock"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="rating" className={cx('form-label')}>
                                Đánh giá
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.rating}
                                    onChange={handleOnChangeDetail}
                                    name="rating"
                                    type="number"
                                    placeholder="Nhập rating"
                                    className={cx('form-control')}
                                    id="rating"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="discount" className={cx('form-label')}>
                                Giảm giá
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.discount}
                                    onChange={handleOnChangeDetail}
                                    name="discount"
                                    type="text"
                                    placeholder="Nhập phần trăm giảm"
                                    className={cx('form-control')}
                                    id="discount"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="supplier" className={cx('form-label')}>
                                Nhà cung cấp
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.supplier}
                                    onChange={handleOnChangeDetail}
                                    name="supplier"
                                    type="text"
                                    placeholder="Nhập nhà cung cấp"
                                    className={cx('form-control')}
                                    id="supplier"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="description" className={cx('form-label')}>
                                Mô tả
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.description}
                                    onChange={handleOnChangeDetail}
                                    name="description"
                                    type="text"
                                    placeholder="Nhập mô tả"
                                    className={cx('form-control')}
                                    id="description"
                                />
                            </div>
                        </div>
                        <div className={cx('form-input-avatar')}>
                            <Upload onChange={handleOnChangeAvatarDetail} className={cx('ant-upload-list-item.ant-upload-list-item-error')} maxCount={1}>
                                <BTN>Select File</BTN>
                            </Upload>
                            {stateProductDetail?.image && <img src={stateProductDetail?.image} className={cx('input-avatar')} alt="avatar" />}
                        </div>
                    </form>
                    <Button login className={cx('btn-save')} onClick={handleOnUpdate}>
                        Cập nhật
                    </Button>
                </Loading>
            </DrawerComponent>
            <Loading isLoading={isLoadingDeleted}>
                <ModalComponent title="Xóa thiết bị" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
                    <div>Bạn có chắc muốn xóa thiết bị này không</div>
                </ModalComponent>
            </Loading>
        </div>
    );
}

export default AdminProduct;
