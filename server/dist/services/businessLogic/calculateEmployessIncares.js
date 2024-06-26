"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentMonthEmployeesCountIncarese = exports.currentMonthEmployeesSalary = void 0;
const currentDate = new Date();
const currentMonthEmployeesSalary = (employees) => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const currentSalary = employees
        .filter((employee) => {
        const employeeDate = new Date(employee.hireDate);
        return (employeeDate.getMonth() === currentMonth &&
            employeeDate.getFullYear() === currentYear);
    })
        .reduce((acc, employee) => acc + employee.salary, 0);
    let previousSalary = employees
        .filter((employee) => {
        const employeeDate = new Date(employee.hireDate);
        return (employeeDate.getMonth() === previousMonth &&
            employeeDate.getFullYear() === previousYear);
    })
        .reduce((acc, employee) => acc + employee.salary, 0);
    previousSalary = previousSalary === 0 ? 1 : previousSalary;
    return ((currentSalary - previousSalary) / previousSalary) * 100;
};
exports.currentMonthEmployeesSalary = currentMonthEmployeesSalary;
const currentMonthEmployeesCountIncarese = (employees) => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    let previousEmployees = employees.filter((employee) => {
        const employeeDate = new Date(employee.hireDate);
        return (employeeDate.getMonth() === previousMonth &&
            employeeDate.getFullYear() === previousYear);
    }).length;
    previousEmployees = previousEmployees === 0 ? 1 : previousEmployees;
    return ((employees.length - previousEmployees) / previousEmployees) * 100;
};
exports.currentMonthEmployeesCountIncarese = currentMonthEmployeesCountIncarese;
//# sourceMappingURL=calculateEmployessIncares.js.map