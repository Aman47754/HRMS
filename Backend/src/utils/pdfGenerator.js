import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const generatePayslipPDF = async ({ employee, payroll }) => {
  return new Promise((resolve, reject) => {
    try {
      const payslipDir = path.join("payslips");
      if (!fs.existsSync(payslipDir)) {
        fs.mkdirSync(payslipDir);
      }

      const filePath = path.join(
        payslipDir,
        `Payslip_${employee.employeeId}_${payroll.month}.pdf`
      );

      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // 🔹 Header
      doc
        .fontSize(20)
        .text("HRMS PAYSLIP", { align: "center" })
        .moveDown();

      // 🔹 Employee Info
      doc.fontSize(12);
      doc.text(`Employee Name: ${employee.fullName}`);
      doc.text(`Employee ID: ${employee.employeeId}`);
      doc.text(`Department: ${employee.department}`);
      doc.text(`Designation: ${employee.designation}`);
      doc.text(`Month: ${payroll.month}`);
      doc.moveDown();

      // 🔹 Earnings
      doc.fontSize(14).text("EARNINGS", { underline: true });
      doc.fontSize(12);
      doc.text(`Basic Salary: ₹${employee.salaryStructure.basic}`);
      doc.text(`HRA: ₹${employee.salaryStructure.hra}`);
      doc.text(`Allowances: ₹${employee.salaryStructure.allowances}`);
      doc.text(`Gross Salary: ₹${payroll.grossSalary}`);
      doc.moveDown();

      // 🔹 Deductions
      doc.fontSize(14).text("DEDUCTIONS", { underline: true });
      doc.fontSize(12);
      doc.text(`Total Deductions: ₹${payroll.deductions}`);
      doc.moveDown();

      // 🔹 Net Salary
      doc
        .fontSize(16)
        .text(`NET SALARY: ₹${payroll.netSalary}`, {
          align: "right"
        });

      doc.moveDown(2);
      doc.fontSize(10).text("This is a system-generated payslip.");

      doc.end();

      stream.on("finish", () => resolve(filePath));
    } catch (error) {
      reject(error);
    }
  });
};

export default generatePayslipPDF;
