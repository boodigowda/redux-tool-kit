import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Table, Button, Space, Select } from "antd";
import AntD from "./AntD"
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
    const [uom, setUom] = useState("")
    const handleCreate = (data) => {
        if (data) {
            let finalObject = {
                key: Date.now(),
                label: `${data[0].label + "_" + data[0].value}`,
                value: "",
                children: data
            };
            handleSave(finalObject)
        }

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
        let Label = record?.label
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
                    Label === "quantity.uom" ?
                        <Select ref={inputRef} onPressEnter={save} onBlur={save} value={uom} options={[
                            { value: "Each" },
                            { value: "Each PEB" },
                            { value: "K" },
                            { value: "Pure Weighted" },
                        ]} />
                        : Label === "isSubstitutionAllowed" ?
                            <Select ref={inputRef} onPressEnter={save} onBlur={save} defaultValue={record.value} options={[
                                { value: "true" },
                                { value: "false" }
                            ]} />
                            : Label === "isManualSubAllowed" ?
                                <Select ref={inputRef} onPressEnter={save} onBlur={save} defaultValue={record.value} options={[
                                    { value: "true" },
                                    { value: "false" }
                                ]} />
                                :
                                <Input onPressEnter={save} onBlur={save} ref={inputRef} />
                }
            </Form.Item>
        ) : (
            record?.label === "orderLines" ?
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
            dataIndex: "label",
            width: "40%",
            editable: false,
        },
        {
            title: "Value",
            dataIndex: "value",
            editable: true,
        },
        {
            title: "",
            dataIndex: "key",
            width: "7%",
            editable: false
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
            function findKeyIndices(arr, keyToFind) {
                for (let i = 0; i < arr.length; i++) {
                    if (Array.isArray(arr[i].children)) {
                        const innerIndices = findKeyIndices(arr[i].children, keyToFind);
                        if (innerIndices.length > 0) {
                            return [i, ...innerIndices];
                        }
                    } else {
                        if (arr[i].key === keyToFind) {
                            return [i];
                        }
                    }
                }
                return [];
            }

            const result = findKeyIndices(newData, row.key);
            if (result) {
                let isOrderLineAdd = row?.label?.slice(0, -1);
                if (isOrderLineAdd === "lineNbr_") {
                    newData.map((item) => {
                        if (item.label === "orderLines") {
                            item.children.push(row)
                        }
                        return null
                    })
                } else {
                    const [parentIndex, childIndex, thiredIndex, forthIndex] = result
                    if (result.length === 4) {
                        newData[parentIndex]?.children[childIndex]?.children[thiredIndex]?.children.splice(forthIndex, 1, row);
                    }
                    if (result.length === 3) {
                        newData[parentIndex]?.children[childIndex]?.children.splice(thiredIndex, 1, row);
                    }
                    if (result.length === 2) {
                        newData[parentIndex]?.children.splice(childIndex, 1, row);
                    }
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


