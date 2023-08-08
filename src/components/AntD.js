import { Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useRef, useState } from 'react'
const { Option } = Select;
const OrderLineForm = ({ visible, onOk, onCancel, clearData, setclearData }) => {

    const formItemStyle = { marginBottom: '8px' };
    const labelColStyle = { paddingBottom: 4 };
    const [form] = Form.useForm();
    const formRef = useRef(null);
    const formInstance = formRef.current;
    const uniqueKeyGenerator = (() => {
        let counter = 0;

        return () => {
            counter++;
            return `o${counter}`;
        };
    })();

    function flattenObject(obj, parentKey = "") {
        let flattenedArray = [];
        for (const key in obj) {
            if (Array.isArray(obj[key])) {
                const childrenArray = obj[key].map((item) => flattenObject(item));
                if (childrenArray.length > 1 || key === "orderLines") {
                    let orderLineArray = childrenArray.map((arr) => {
                        return {
                            key: uniqueKeyGenerator(),
                            label: `${arr[0].label + "_" + arr[0].value}`,
                            value: "",
                            children: arr
                        }
                    })
                    flattenedArray.push({ key: uniqueKeyGenerator(), label: parentKey + key, children: orderLineArray });
                } else {
                    flattenedArray.push({ key: uniqueKeyGenerator(), label: parentKey + key, children: childrenArray.flat() });
                }
            } else if (typeof obj[key] === "object" && obj[key] !== null) {
                const nestedArray = flattenObject(obj[key], `${parentKey}${key}.`);
                flattenedArray = flattenedArray.concat(nestedArray);
            } else {
                const flatKey = `${parentKey}${key} `;
                const value = obj[key] === null ? null : (typeof obj[key] === "string" ? obj[key] : JSON.stringify(obj[key]));
                flattenedArray.push({ key: uniqueKeyGenerator(), label: flatKey.trim(), value: value });
            }
        }
        return flattenedArray;
    }

    const handleFormSubmit = () => {
        formInstance?.validateFields().then((values) => {
            let constantValues = {
                "lineDisplayAttributes": {
                    "itemNbr": "570178682",
                    "color": "Pink"
                },
                "metafields": {
                    "minIdealPickDays": 0,
                    "maxIdealPickDays": 0,
                    "isSellbyDateRequired": false,
                    "isOrderByQuantity": true
                },
                "locations": [
                    {
                        "zoneName": "W",
                        "aisleName": "2",
                        "sectionName": "9",
                        "type": "SALESFLOOR",
                        "sectionId": "1",
                        "positionSeqNbr": 1,
                        "shelfIds": 2,
                        "shelfPosition": 3
                    }
                ],
                "products": [
                    {
                        "productId": "873624",
                        "type": "ORDERED",
                        "barcode": "42800109538",
                        "barcodeType": "GTIN"
                    }
                ]
            }
            let createdObjects = values;

            let updatedObject = { ...createdObjects, ...constantValues };
            onOk(flattenObject(updatedObject))
        });
    }

    if (clearData) {
        formInstance?.resetFields();
        setclearData(false)
    }

    return (
        <React.Fragment>
            <div className="container mt-5">
                <Modal
                    title="Create Order Line"
                    open={visible}
                    onOk={handleFormSubmit}
                    okText="Create"
                    onCancel={onCancel}
                    ref={formRef}
                >
                    <Form form={form} ref={formRef} layout="vertical" labelCol={{ style: labelColStyle }}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item style={formItemStyle} label="Line Number" name="lineNbr">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item style={formItemStyle} label="Quantity">
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item style={formItemStyle} name={['quantity', 'value']} noStyle>
                                                <Input placeholder='select quantity' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name={['quantity', 'uom']} noStyle>
                                                <Select placeholder='select unit' style={{ width: '100%' }}>
                                                    <Option value="EACH">EACH</Option>
                                                    <Option value="Each PEB">Each PEB</Option>
                                                    <Option value="K">K</Option>
                                                    <Option value="Pure Weighted">Pure Weighted"</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>


                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item style={formItemStyle} label="Is Substitution Allowed" name="isSubstitutionAllowed">
                                    <Select style={{ width: '100%' }}>
                                        <Option value="true">true</Option>
                                        <Option value="false">false</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item style={formItemStyle} label="Is Manual Substitution Allowed" name="isManualSubAllowed">
                                    <Select style={{ width: '100%' }}>
                                        <Option value="true">true</Option>
                                        <Option value="false">false</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item style={formItemStyle} label="Item On Hand Quantity" name="itemOnHandQty">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item style={formItemStyle} label="Web Unit Price" name="webUnitPrice">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item style={formItemStyle} label="Store Unit Price" name="storeUnitPrice">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item style={formItemStyle} label="Item Number" name="itemNbr">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item style={formItemStyle} label="Item Description" name="itemDesc">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item style={formItemStyle} label="Department No" name={['department', 'deptNbr']}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>

            </div>
        </React.Fragment>
    )
}

export default OrderLineForm;