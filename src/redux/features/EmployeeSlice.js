import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeesList: [
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
  ],
};

const employeeSlice = createSlice({
  name: "employees",
  initialState: initialState,
  reducers: {
    updateSelectedEmp : (state,action) =>{
        state.employeesList = state.employeesList.map((employee) => {
            if (employee.id === action.payload) {
              return {
                ...employee,
                isSelected: !employee.isSelected,
              };
            } else return employee;
          });
    }
  },
});

export const {updateSelectedEmp} = employeeSlice.actions;
export default employeeSlice.reducer;
