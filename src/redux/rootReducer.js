import CounterSlice from "./features/CounterSlice";
import EmployeeSlice from "./features/EmployeeSlice";
import UserListSlice from "./features/UserListSlice";

const rootReducer = {
    counter: CounterSlice,
    employees:EmployeeSlice,
    users: UserListSlice
}

export default rootReducer;