import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Select,
    Space,
    Typography,
    Button,
    Dropdown,
    Tabs,
    Collapse,
    Input,
    Table
} from "antd";
import { DownOutlined } from "@ant-design/icons";
// import AppModal from "./atoms/Modal";
import EditableTable from "./EditTable";
import axios from "axios";
// import Spinner from "./molecules/Spinner";

const { Text, Title } = Typography;
axios.defaults.baseURL = 'https://faas-adapter-api.store-assist-int.dev.k8s.walmart.net';
const items = [
    {
        label: "Recent ",
        key: "1",
        disabled: true,
    },
    {
        label: "Import",
        key: "2",
    },
    {
        label: "Open",
        key: "3",
        danger: true,
    },
];

const initialData = {
    "order": {
        "orderId": "201689950019888",
        "customerOrderId": "1689950019890",
        "orderSource": "ASDA",
        "customer": {
            "id": "10000550125",
            "contact": {
                "name": {
                    "firstName": "Karthik",
                    "lastName": "Automation"
                }
            }
        },
        "paymentAuthStatus": "Success",
        "orderDueDate": "2023-07-21T15:00:00+00:00",
        "priorityCode": "000",
        "orderDates": {
            "customerPickUpByDate": "2023-07-22T09:59:59+00:00"
        },
        "dispatchMethodCode": 1,
        "orderTotal": "645.00",
        "pickupDetails": {
            "slot": {
                "startTime": "06:00",
                "endTime": "08:00"
            },
            "pickupPersonDetails": [
                {
                    "contact": {
                        "name": {
                            "firstName": "first944902311618",
                            "lastName": "last944902311618"
                        },
                        "phone": "9977883344",
                        "email": "jamestest@gmail.com"
                    },
                    "isPrimary": true
                }
            ]
        },
        "orderLines": [
            {
                "lineNbr": 1,
                "quantity": {
                    "value": 5,
                    "uom": "EACH"
                },
                "isSubstitutionAllowed": true,
                "isManualSubAllowed": true,
                "itemOnHandQty": 63,
                "webUnitPrice": 4.0,
                "storeUnitPrice": 4.38,
                "itemNbr": 570178682,
                "itemDesc": "TTNO PZ RL PEPP 50CT",
                "imageUrl": "https://i5.walmartimages.com/asr/41456e26-5907-4b47-919ff795960c9a79_1.96f4c097407ed2b7d5e887113152ee9c.jpeg",
                "department": {
                    "deptNbr": 78
                },
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
            },
            {
                "lineNbr": 2,
                "quantity": {
                    "value": 5,
                    "uom": "EACH"
                },
                "isSubstitutionAllowed": true,
                "isManualSubAllowed": true,
                "itemOnHandQty": 63,
                "webUnitPrice": 4.0,
                "storeUnitPrice": 4.38,
                "itemNbr": 570178682,
                "itemDesc": "TTNO PZ RL PEPP 50CT",
                "imageUrl": "https://i5.walmartimages.com/asr/41456e26-5907-4b47-919ff795960c9a79_1.96f4c097407ed2b7d5e887113152ee9c.jpeg",
                "department": {
                    "deptNbr": 78
                },
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
        ]
    }
}

const columns = [
    {
        title: 'Key',
        dataIndex: 'property',
        key: 'property',
        width: '40%'
    },
    {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        width: '60%'

    },
];
const FaaS = () => {
    const [selectedCountry, setSelectedCountry] = useState("Select");
    const [selectedTenantId, setSelectedTenantId] = useState("Select");
    const [selectedEnvironment, setSelectedEnvironment] = useState("Select");
    const [selectedStore, setSelectedStore] = useState("Select");

    const [inputValue, setInputValue] = useState('');
    const [statusData, setStatusData] = useState([]);

    const [faasTableData, setFaasTableData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [requiredFieldsTableData, setRequiredFieldsTableData] = useState([]); // Required for tabular format
    // const [optionalFieldsTableData, setOptionalFieldsTableData] = useState([]);

    const [refinedRequiredFieldData, setRefinedRequiredFieldData] = useState([]); // Required for submit api 
    const [countryData, setCountryData] = useState([]);
    const [dropdownData, setDropdownData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState([]);

    useEffect(() => {
        axios.get('/faas/adaptor/country')
            .then(countries => setCountryData(countries.data))
            .catch(err => console.log({ err }))
    }, [])

    useEffect(() => {
        if (faasTableData?.order) {
            const productData = flattenObject(faasTableData?.order)
            const data = productData?.map(key => ({ key: key.key, value: key.value, ...key.children && { children: key.children } }));
            console.log(data)
            setRefinedRequiredFieldData(data)
        }

    }, [faasTableData]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (selectedCountry) {
            setLoader(true);
            axios.get(`/faas/adaptor/country/${selectedCountry}`)
                .then(values => {
                    setDropdownData(values.data)
                    setSelectedTenantId('Select');
                    setSelectedEnvironment('Select');
                    setSelectedStore('Select');
                    setInputValue('');
                })
                .catch(err => console.log({ err }))
                .finally(() => setLoader(false))
        }
    }, [selectedCountry])

    useEffect(() => {
        getTableDetails()
    }, [])

    const handleJSONUpload = (fileName) => {
        setOpen(['1'])
        setFaasTableData(fileName)
    }

    function flattenObject(obj, parentKey = "") {
        let flattenedArray = [];

        for (const key in obj) {
            if (Array.isArray(obj[key])) {
                const childrenArray = obj[key].map((item) => flattenObject(item));
                if (key === "orderLines") {
                    let orderLineArray = childrenArray.map((arr) => {
                        let modifiedArray = arr.slice();
                        modifiedArray.shift();
                        return {
                            key: arr[0].key,
                            value: arr[0].value,
                            children: modifiedArray
                        }
                    })
                    flattenedArray.push({ key: parentKey + key, value: '', children: orderLineArray });
                } else {
                    flattenedArray.push({ key: parentKey + key, value: '', children: childrenArray.flat() });
                }
            } else if (typeof obj[key] === "object" && obj[key] !== null) {
                const nestedArray = flattenObject(obj[key], `${parentKey}${key}.`);
                flattenedArray = flattenedArray.concat(nestedArray);
            } else {
                const flatKey = `${parentKey}${key}`;
                const value = obj[key] === null ? null : (typeof obj[key] === "string" ? obj[key] : JSON.stringify(obj[key]));
                flattenedArray.push({ key: flatKey, value: value });
            }
        }

        return flattenedArray;
    }





    function convertData(input) {
        const output = {};

        for (const item of input) {
            const keys = item.key.split('.');
            let currentOutput = output;

            // Traverse through the keys to dynamically create the nested structure
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                if (!currentOutput[key]) {
                    currentOutput[key] = {};
                }
                currentOutput = currentOutput[key];
            }

            // Set the value to the final nested key
            const lastKey = keys[keys.length - 1];
            const value = item.value === '' ? null : convertValue(item.value);
            currentOutput[lastKey] = value;

            // If the item has children, recursively process them
            if (item.children && item.children.length > 0) {
                if (!currentOutput[lastKey]) {
                    currentOutput[lastKey] = [];
                }
                currentOutput[lastKey].push(convertData(item.children));
            }
        }

        return output;
    }

    // Helper function to convert values to appropriate types
    function convertValue(value) {
        if (value?.toLowerCase() === 'true') {
            // Convert "true" strings to boolean true
            return true;
        } else if (value?.toLowerCase() === 'false') {
            // Convert "false" strings to boolean false
            return false;
        } else {
            return value;
        }
    }

    const handleMenuClick = (e) => {
        if (e.key === '2') setModalOpen(true);
        else if (e.key === '3') getTableDetails()
    };

    const handleClear = () => {
        setSelectedCountry('Select');
        setSelectedTenantId('Select');
        setSelectedEnvironment('Select');
        setSelectedStore('Select');
        setInputValue('');
        setStatusData([]);
        setOpen([]);
        setRefinedRequiredFieldData('');
    }

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const handleCountryChange = (value) => {
        setSelectedCountry(value);
    };

    const handleTenantIdChange = (value) => {
        setSelectedTenantId(value);
    };
    const handleStoreChange = (value) => {
        setSelectedStore(value);
    };

    const handleCollapsePayload = (keys) => {
        setOpen(keys)
    }
    const handleEnvironmentChange = (value) => {
        setSelectedEnvironment(value);
    };
    const handleInputChange = (event) => {
        const { value } = event.target;
        setInputValue(value);
    };
    const onChange = (key) => {
        console.log(key);
    };

    const getCountryList = () => {
        return countryData?.map((item) => ({
            value: item,
            label: item,
        }));
    };

    const getTenantIdByCountry = () => {
        return dropdownData?.tenantIds?.map((tenant) => ({
            value: tenant,
            label: tenant,
        })) || []
    };
    const getEnvironmentByCountry = () => {
        return dropdownData?.environments?.map((env) => ({ value: env, label: env })) || []
    };
    const getStoreByCountry = () => {
        return dropdownData?.stores?.map((store) => ({ value: store, label: store })) || []
    };

    const getTableDetails = () => {
        setFaasTableData(initialData);
        setLoader(true);
        axios.get(`/faas/adaptor/pfo/orderpfo/${selectedCountry}`)
            .then(res => {
                setFaasTableData(res.data);
                setOpen(["1"]);
            })
            .catch(err => console.log({ err }))
            .finally(() => setLoader(false));
    }
    const checkStatus = () => {
        setLoader(true);
        axios.get(`/faas/adaptor/getOrderStatusFromFos?searchMethod=CUST_ORDER_ID&searchValue=${inputValue}`,
            {
                headers: {
                    'X-countryCode': selectedCountry,
                    'X-nodeId': selectedStore,
                    'X-tenantId': selectedTenantId,
                    'env': selectedEnvironment
                }
            })

            .then(res => {
                const dataSource = Object.entries(res.data).map(([key, value]) => ({
                    key,
                    property: key,
                    value: "" + value,
                }));
                setStatusData(dataSource)
                setOpen(["status"]);
            })
            .catch(err => console.log({ err }))
            .finally(() => setLoader(false));
    }
    const triggerSubmitAPI = () => {
        setLoader(true);
        axios.post('/faas/adaptor/createOrder', {
            order: convertData(requiredFieldsTableData)
        },
            {
                headers: {
                    'X-countryCode': selectedCountry,
                    'X-nodeId': selectedStore,
                    'X-tenantId': selectedTenantId,
                    'env': selectedEnvironment
                }

            })
            .then(res => {
                const dataSource = Object.entries(res.data).map(([key, value]) => ({
                    key,
                    property: key,
                    value: "" + value,
                }));
                setStatusData(dataSource)
                setOpen(["status"]);
            })
            .catch(err => console.log({ err }))
            .finally(() => setLoader(false))
    }

    return (
        <>
            {/* {loader && <div className="spinner-class"><Spinner /></div>} */}
            <Typography style={{ margin: '5px' }} className="faas-root-comp">
                <Row justify={"center"}>
                    <Title level={5}>Order Management</Title>
                </Row>
                <Row justify="center" style={{ padding: "25px" }}>
                    <Col span={4}>
                        <Text>Country</Text>
                        <Select
                            defaultValue="Select"
                            style={{ width: 120 }}
                            value={selectedCountry}
                            className="select-dropdown-country"
                            onChange={handleCountryChange}
                            options={getCountryList()}
                        />
                    </Col>
                    <Col span={4}>
                        <Text>Tenant ID</Text>
                        <Select
                            defaultValue="Select"
                            value={selectedTenantId}
                            style={{ width: 120 }}
                            className="select-dropdown-country"
                            onChange={handleTenantIdChange}
                            options={getTenantIdByCountry()}
                        />
                    </Col>
                    <Col span={4}>
                        <Text>Environment</Text>
                        <Select
                            defaultValue="Select"
                            value={selectedEnvironment}
                            style={{ width: 120 }}
                            className="select-dropdown-country"
                            onChange={handleEnvironmentChange}
                            options={getEnvironmentByCountry()}
                        />
                    </Col>
                    <Col span={4}>
                        <Text>Store</Text>
                        <Select
                            defaultValue="Select"
                            value={selectedStore}
                            style={{ width: 120 }}
                            className="select-dropdown-country"
                            onChange={handleStoreChange}
                            options={getStoreByCountry()}
                        />
                    </Col>
                    <Col span={4}>
                        <Text>Customer Order ID</Text>
                        <Input defaultValue={""} placeholder="" style={{ width: '50%', marginLeft: '10px' }} onChange={handleInputChange} value={inputValue} />
                    </Col>
                    <Col span={4} align="right">
                        <Dropdown menu={menuProps}>
                            <Button className="custom-button">
                                <Space>
                                    JSON
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                        <Button type="primary" style={{ marginLeft: "15px" }} disabled={inputValue.length === 0 || selectedCountry === "Select" || selectedTenantId === "Select" || selectedEnvironment === "Select" || selectedStore === "Select"}
                            onClick={checkStatus}
                        >
                            Status
                        </Button>
                    </Col>
                </Row>
                {/* <Row> */}
                <div style={{ padding: "25px" }}>

                    <Collapse activeKey={open} onChange={handleCollapsePayload}
                        size="small"
                        items={[
                            {
                                key: "1",
                                label: "Payload",
                                children: (
                                    <>
                                        <Tabs
                                            onChange={onChange}
                                            type="card"
                                            items={[
                                                {
                                                    label: "Required",
                                                    key: "Required",
                                                    children: (
                                                        <Row justify={"center"}>
                                                            <Col align="middle" span={12}>
                                                                <EditableTable
                                                                    tableData={refinedRequiredFieldData}
                                                                    syncChangesInParent={(data) =>
                                                                        setRequiredFieldsTableData(data)
                                                                    }
                                                                />
                                                            </Col>
                                                        </Row>
                                                    ),
                                                },
                                                {
                                                    label: "Optional",
                                                    key: "Optional",
                                                    children: (
                                                        <Row justify={"center"}>
                                                            <Col align="middle" span={12}>
                                                                <EditableTable
                                                                    tableData={[]}
                                                                    syncChangesInParent={(data) =>// setOptionalFieldsTableData(data)
                                                                        null
                                                                    }
                                                                />
                                                            </Col>
                                                        </Row>
                                                    ),
                                                },
                                            ]}
                                        />
                                        <Col span={24} align="right" style={{ padding: "25px" }}>
                                            <Button
                                                type="primary"
                                                style={{ marginLeft: "15px" }}
                                                onClick={triggerSubmitAPI}
                                                disabled={selectedCountry === "Select" || selectedTenantId === "Select" || selectedEnvironment === "Select" || selectedStore === "Select"}
                                            >
                                                Submit
                                            </Button>
                                        </Col>
                                    </>
                                ),
                            },
                            {
                                key: "status",
                                label: "Status",
                                children: (
                                    <Row justify={'center'}>
                                        <Col span={18} align="center">
                                            <Table dataSource={statusData} columns={columns} pagination={false} />
                                        </Col>
                                    </Row>
                                ),
                            },
                        ]}
                    />
                </div>
                <Row className="bottom-faas-page" justify={'center'}>
                    <Col span={24} align="right" style={{ padding: "25px" }}>

                        <Button
                            onClick={handleClear}
                            type="primary"
                            style={{ marginLeft: "15px", backgroundColor: "grey" }}
                        >
                            Clear
                        </Button>
                    </Col>
                </Row>
                {/* </Row> */}
            </Typography>
            {/* {modalOpen && <AppModal onUpdate={() => setModalOpen(!modalOpen)} handleNewUploadedJSON={(fileData) => handleJSONUpload(fileData)}/>} */}
        </>
    );
};

export default FaaS;