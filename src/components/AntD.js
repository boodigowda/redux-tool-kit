import { Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useRef, useState } from 'react'
const { Option } = Select;
const OrderLineForm = ({ visible, onOk, onCancel, clearData, setclearData }) => {

    const formItemStyle = { marginBottom: '8px' };
    const labelColStyle = { paddingBottom: 4 };
    const [form] = Form.useForm();
    const formRef = useRef(null);
    const formInstance = formRef.current;

    const convertObjectToKeyValue = (formValues) => {
        const resArray = [];
        for (const key in formValues) {
            if (typeof formValues[key] === "object" && formValues[key] !== null) {
                const innerArray = convertObjectToKeyValue(formValues[key]);
                if (innerArray.length > 0) {
                    resArray.push({ key, value: "", children: innerArray });
                } else {
                    resArray.push({ key, value: formValues[key] });
                }
            } else {
                resArray.push({ key, value: formValues[key] });
            }
        }

        let modifiedArray = resArray?.slice();
        modifiedArray.shift();
        let finalArray = {
            key: `${resArray[0].key + " " + resArray[0].value}`,
            value: resArray[0].value,
            children: modifiedArray
        }
        return finalArray;
    }

    const handleFormSubmit = () => {
        formInstance?.validateFields().then((values) => {
            onOk(convertObjectToKeyValue(values))
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
                                            <Form.Item style={formItemStyle} name='quantity.value' noStyle>
                                                <Input placeholder='select quantity' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name='quantity.uom' noStyle>
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
                                <Form.Item style={formItemStyle} label="Department No" name="department.deptNbr">
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