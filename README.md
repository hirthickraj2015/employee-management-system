Employee Management System
Overview
The Employee Management System is a web application designed to manage employee records efficiently. It provides functionalities for adding, updating, deleting, searching, and filtering employee information. The system also includes features such as listing all employees, calculating average salaries, and more.

Project Structure
The project follows a typical structure for a web application with the main components being:

Models: Defines the structure of the data using Mongoose for MongoDB.
Routes: Handles various HTTP requests and directs them to the appropriate controllers.
Controllers: Implements the business logic of the application.
Views (EJS Templates): Responsible for rendering HTML pages with dynamic data.
Public: Contains static files such as CSS stylesheets and client-side JavaScript.
Tech Stack
Node.js: Server-side JavaScript runtime.
Express.js: Web application framework for Node.js.
MongoDB: NoSQL database for storing employee data.
Mongoose: MongoDB object modeling for Node.js.
EJS: Templating engine for generating HTML markup.
Bootstrap: Front-end framework for styling and layout.
Functionality
1. Adding Employee
Navigate to "/addEmployee" to add a new employee.
Fill in the required details such as Employee ID, Name, Date of Birth, Salary, and Department.
Click "Add Employee" to save the employee record.
2. Updating Employee
Navigate to "/getEmployeeId" to search for an employee by ID.
Choose the employee to update and click "Update Employee".
Modify the employee details and click "Update" to save changes.
3. Deleting Employee
Navigate to "/delEmployeeId" to search for an employee by ID.
Choose the employee to delete and click "Yes, Delete" to confirm.
4. Listing All Employees
Navigate to "/allEmployee" to view a list of all employees.
5. Searching Employee
Navigate to "/findEmployee" to search for an employee by ID or Name.
Enter the search input and click "Find" to view matching results.
6. Filtering Employees
Navigate to "/filterEmployee" to filter employees based on age, salary, and department.
Fill in the filter criteria and click "Filter" to view matching results.
7. Average Salary Calculation
Navigate to "/averageSalary" to calculate the average salary.
Choose between total average salary and average salary by department.
If selecting by department, choose the department from the dropdown.
Getting Started
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/employee-management-system.git
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory and add the following:

makefile
Copy code
PORT=3000
MONGO_URI=your_mongodb_connection_string
Run the application:

bash
Copy code
npm start
Access the application in your browser at http://localhost:3000.

Hosting
This project is hosted on Cyclic. You can access the live application at your-cyclic-url.
 
