export default ({ basic, hra, allowances }) => {
  const gross = basic + hra + allowances;
  const deductions = gross * 0.2;
  return {
    grossSalary: gross,
    deductions,
    netSalary: gross - deductions
  };
};