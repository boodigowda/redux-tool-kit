import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedEmp } from "../redux/features/EmployeeSlice";

const EmployeesRedux = () => {
  const employees = useSelector((state) => {
      return state.employees.employeesList
  });

  const dispatch = useDispatch();

  console.log(employees)

  let updateSelected = (empId) => {
    dispatch(updateSelectedEmp(empId))
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

export default EmployeesRedux;
