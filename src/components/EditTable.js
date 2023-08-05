import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Table, Button, Space } from "antd";
// import OrderLineForm from "../../AddOrderLine";
import AntD from "./AntD"
// import { Form, Input, Select, DatePicker, Table, Button, Space } from "antd";
// import { DownOutlined } from "@ant-design/icons";
// import dayjs from "dayjs";
// const dateFormat = "YYYY/MM/DD"
// const customFormat = (value) => {
//     dayjs(value,dateFormat).format(dateFormat)
// }
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex], 
        });
    };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [clearData, setclearData] = useState(false);
    const handleCreate = (data) => {
        handleSave(data)
        setIsModalVisible(false)
    }
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const onAddOrderLine = () => {
        setclearData(true)
        setIsModalVisible(true)
    }
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                {
                    // record.key === "quantity.uom" ?
                    // <Select ref={inputRef} onPressEnter={save} onBlur={save} defaultValue={record.value} options={[
                    //   {value:"Each"},
                    //   {value:"Each PEB"},
                    //   {value:"K"},
                    //   {value:"Pure Weighted"},
                    // ]}/>
                    // : record.key === "isSubstitutionAllowed" ?
                    // <Select ref={inputRef} onPressEnter={save} onBlur={save} defaultValue={record.value} options={[
                    //   {value:"true"},
                    //   {value:"false"}
                    // ]}/>
                    // : record.key === "isManualSubAllowed" ?
                    // <Select ref={inputRef} onPressEnter={save} onBlur={save} defaultValue={record.value} options={[
                    //   {value:"true"},
                    //   {value:"false"}
                    // ]}/>
                    // // : record.key === "orderDueDate" || record.key === "orderDates.customerPickUpByDate" ?
                    // //   <DatePicker ref={inputRef} onPressEnter={save} onBlur={save} defaultValue={dayjs(record.value).toDate()} format='YYYY-MM-DDTHH:mm:ss.SSS[Z]'/>

                    //   :

                    <Input onPressEnter={save} ref={inputRef} />
                }
            </Form.Item>
        ) : (
            record.key === "orderLines" ?
                <>
                    <Button onClick={onAddOrderLine} className="custom-button">
                        <Space>
                            Add
                        </Space>
                    </Button>
                    <AntD visible={isModalVisible} clearData={clearData} setclearData={setclearData} onOk={handleCreate} onCancel={handleCancel} />
                </>
                :
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};
const EditableTable = ({ tableData, syncChangesInParent }) => {
    const [dataSource, setDataSource] = useState([]);
    const defaultColumns = [
        {
            title: "Key",
            dataIndex: "key",
            width: "40%",
            editable: false,
        },
        {
            title: "Value",
            dataIndex: "value",
            editable: true,
        },
    ];
    useEffect(() => {
        syncChangesInParent(dataSource);
    }, [dataSource]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setDataSource(tableData)
    }, [tableData])

    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        if (index !== -1) {
            const item = newData[index];
            newData.splice(index, 1, {
                ...item,
                ...row,
            });
        } else {
            function findObjectIndexRecursive(arr, currentRow, parentIndex = []) {
                for (let i = 0; i < arr.length; i++) {
                    const currentObject = arr[i];

                    if (currentObject.key === currentRow.key) {
                        return { parentIndex, childIndex: i };
                    }

                    if (currentObject.children && currentObject.children.length > 0) {
                        const result = findObjectIndexRecursive(currentObject.children, currentRow, [...parentIndex, i]);
                        if (result) {
                            return result;
                        }
                        if (currentObject.key === "orderLines" && currentRow.children.length > 1) {
                            return currentRow
                        }
                    }
                }

                return null;
            }

            const result = findObjectIndexRecursive(newData, row);
            if (result) {
                if (result.children.length > 5) {
                    newData.map((item) => {
                        if (item.key === "orderLines") {
                            item.children.push(result)
                        }
                    })
                } else {
                    const { parentIndex, childIndex } = result
                    if (parentIndex.length > 1) {
                        const [nestedParentIndex, nestedSubParentIndex] = parentIndex
                        newData[nestedParentIndex]?.children[nestedSubParentIndex]?.children.splice(childIndex, 1, row);
                    }
                    else newData[parentIndex]?.children.splice(childIndex, 1, row);
                }
            }

        }
        setDataSource(newData);
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave
            }),
        };
    });
    return (
        <div>
            <Table
                className="grid-data-table"
                components={components}
                rowClassName={() => "editable-row"}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
        </div>
    );
};
export default EditableTable;


