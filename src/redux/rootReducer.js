import CounterSlice from "./features/CounterSlice";
import EmployeeSlice from "./features/EmployeeSlice";

const rootReducer = {
    counter: CounterSlice,
    employees:EmployeeSlice
}

export default rootReducer;