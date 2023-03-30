import React, { useState } from "react";

const Employees = () => {
  const employeesList = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      isSelected: false,
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      isSelected: false,
    },
    {
      id: 3,
      name: "Clementine Bauch",
      username: "Samantha",
      email: "Nathan@yesenia.net",
      isSelected: false,
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      username: "Karianne",
      email: "Julianne.OConner@kory.org",
      isSelected: false,
    },
    {
      id: 5,
      name: "Chelsey Dietrich",
      username: "Kamren",
      email: "Lucio_Hettinger@annie.ca",
      isSelected: false,
    },
  ];
  
  let [state, setState] = useState({
    employees: employeesList,
  });

  let { employees } = state;

  let updateSelected = (empId) => {
    let selectedEmployees = employees.map((employee) => {
      if (employee.id === empId) {
        return {
          ...employee,
          isSelected: !employee.isSelected,
        };
      } else return employee;
    });
    setState({
      ...state,
      employees: selectedEmployees,
    });
  };
  return (
    <React.Fragment>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <p className="h3 text-primary">Employees</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
              ea, eos officia ratione reiciendis repellendus sapiente sit sunt
              voluptatem. A accusamus beatae consectetur cum inventore, magni
              quae! Deserunt, facilis, officiis?
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <ul className="list-group">
              {employees.length > 0 &&
                employees.map((employee) => {
                  return (
                    <li key={employee.id} className="list-group-item">
                      <input
                        onChange={() => updateSelected(employee.id)}
                        type="checkbox"
                        className="form-check-input me-2"
                      />
                      {employee.name}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col-md-6">
            {employees.length > 0 &&
              employees.map((employee) => {
                return (
                  <div key={employee.id}>
                    {employee.isSelected && (
                      <div className="card my-2">
                        <div className="card-body">
                          <ul className="list-group">
                            <li className="list-group-item">
                              Name :{" "}
                              <span className="fw-bold">{employee.name}</span>
                            </li>
                            <li className="list-group-item">
                              Email :{" "}
                              <span className="fw-bold">{employee.email}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Employees;
