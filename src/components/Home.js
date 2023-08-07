import { Collapse, Table } from "antd";
import React from "react";

const { Panel } = Collapse;

const Home = () => {


  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];
  const data = [
    {
      key: 'Key 1',
      value: 'Value 1',
      childrenData: [
        { key: 'Child 1', value: 'Child Value 1' },
        { key: 'Child 2', value: 'Child Value 2' },
      ],
    },
    {
      key: 'Key 2',
      value: 'Value 2',
      childrenData: [
        { key: 'Child 3', value: 'Child Value 3' },
        { key: 'Child 4', value: 'Child Value 4' },
      ],
    },
    // Add more data here if needed
  ];

  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="row">
          <div className="col text-center mt-5">
            <img
              width="50%"
              src="https://hybridheroes.de/blog/content/images/2022/03/redux-toolkit-1400.jpg"
              alt="REDUX"
            />
            <p className="h3 display-3">
              Crash Course <span className="fw-bold">2022</span>
            </p>
            <Collapse accordion>
              {data.map((item, index) => (
                <Panel header={item.key} key={index}>
                  <p>{item.value}</p>
                  <Table dataSource={item.childrenData} columns={columns} pagination={false} />
                </Panel>
              ))}
            </Collapse>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
