import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment/moment';
import React, { useState } from 'react'
const { Option } = Select;
const AntD = () => {

    const handleDateChange = (date, dateString) => {
        const formattedDate = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        console.log('Selected date: ', formattedDate);
    };
    const formItemStyle = { marginBottom: '8px' };
    const labelColStyle = { paddingBottom: 4 };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log(form.getFieldsValue())
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleUploadChange = (info) => {
        if (info.file.status === 'done') {
            form.setFieldsValue({ imageUrl: info.file.response });
        }
    };
    return (
        <React.Fragment>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <p className="h3 display-3">AntD</p>
                                <h1>Choose a date:</h1>
                                <DatePicker onChange={handleDateChange} format="YYYY-MM-DDTHH:mm:ss.SSS[Z]" />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <div className="card-body">
                            <h1>Form with Ant Design</h1>
                            <Button type="primary" onClick={showModal}>
                                Open Form Popup
                            </Button>
                            <Modal
                                title="Create Order Line"
                                visible={isModalVisible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                            >
                                <Form form={form} layout="vertical" labelCol={{ style: labelColStyle }}>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item style={formItemStyle} label="Line Number" name="LineNbr" initialValue={2}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item style={formItemStyle} label="Quantity">
                                                <Row gutter={16}>
                                                    <Col span={12}>
                                                        <Form.Item style={formItemStyle} name={['quantity', 'value']} noStyle initialValue={5}>
                                                            <Input placeholder='quantity' />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item name={['quantity', 'uom']} noStyle initialValue="">
                                                            <Select placeholder='select unit' style={{ width: '100%' }}>
                                                                <Option value="EACH">EACH</Option>
                                                                <Option value="KG">KG</Option>
                                                                <Option value="LITRE">LITRE</Option>
                                                                {/* Add other options here */}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>


                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item style={formItemStyle} label="Is Substitution Allowed" name="isSubstitutionAllowed" initialValue="true">
                                                <Select style={{ width: '100%' }}>
                                                    <Option value="true">true</Option>
                                                    <Option value="false">false</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item style={formItemStyle} label="Is Manual Substitution Allowed" name="isManualSubAllowed" initialValue="false">
                                                <Select style={{ width: '100%' }}>
                                                    <Option value="true">true</Option>
                                                    <Option value="false">false</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item style={formItemStyle} label="Item On Hand Quantity" name="itemOnHandQty" initialValue={63}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item style={formItemStyle} label="Web Unit Price" name="webUnitPrice" initialValue={4.0}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item style={formItemStyle} label="Store Unit Price" name="storeUnitPrice" initialValue={4.38}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item style={formItemStyle} label="Item Number" name="itemNbr" initialValue={570178682}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item style={formItemStyle} label="Item Description" name="itemDesc" initialValue="TTNO PZ RL PEPP 50CT">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item style={formItemStyle} label="Item Description" name="itemDesc" initialValue="TTNO PZ RL PEPP 50CT">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item style={formItemStyle} label="Department" name={['department', 'deptNbr']} initialValue={78}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item style={formItemStyle} label="Upload Image" name="imageUrl">
                                                <Upload
                                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                    name="image"
                                                    onChange={handleUploadChange}
                                                >
                                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AntD