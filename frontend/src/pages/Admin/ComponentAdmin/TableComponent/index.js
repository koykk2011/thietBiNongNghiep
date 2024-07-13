import { Dropdown, Space, Table } from 'antd';
import style from './TableComponent.module.scss';
import classNames from 'classnames/bind';
import Loading from '~/components/LoadingComponent';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
const cx = classNames.bind(style);
function TableComponent(props) {
    const { selectionType = 'checkbox', data, columns = [], isLoading = false, handleDeleteMany } = props;
    const [rowSelectedKey, setRowSelectedKey] = useState([]);
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKey(selectedRowKeys);
        },
    };
    const hanleDeleteAll = () => {
        handleDeleteMany(rowSelectedKey);
    };

    const items = [
        {
            label: <div onClick={hanleDeleteAll}>Xóa tất cả</div>,
            key: '0',
        },
        {
            label: <div>2nd menu item</div>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];
    return (
        <div>
            <Loading isLoading={isLoading}>
                {rowSelectedKey.length > 0 && (
                    <div className={cx('dropdown')}>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            trigger={['click']}
                        >
                            <span onClick={(e) => e.preventDefault()} className={cx('option')}>
                                <Space>
                                    Chọn hành động
                                    <DownOutlined />
                                </Space>
                            </span>
                        </Dropdown>
                    </div>
                )}
                {/* <button onClick={exportExcel}>export Excel</button> */}
                <Table
                    className={cx('table')}
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    {...props}
                />
            </Loading>
        </div>
    );
}

export default TableComponent;
