const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")
let departments = ["Human Resources", "Development", "Facilities"];
let managers = [2, 333, 444, 555];
let roles = ["Engineer", "Senior Engineer", "Manager", "Entry HR", "Senior HR", "Custodian", "Facilities Manager", "Manager HR"];
let roleIds =[1, 2, 3, 4, 5, 6, 7, 8];
const connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "staffgen"
});

connection.connect(function (err) {
    if (err) throw err;
    init();
});

function displayQuery(qu) {

    connection.query(qu, function (err, res) {
        if (err) throw err;
        console.table(res);
    })
}

function init() {
    var query = "SELECT employee.first_name, employee.last_name, role.title, department.name FROM employee INNER JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id";
    console.log("Welcome to the staff database! Here are our current employees:")
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        menu();
    });
}

function menu() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Choose an option from the list:",
        choices: [
            "View all employees",
            "View employees by department",
            "View employees by manager",
            "View all roles",
            "Add new employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager"
        ]

    }).then(function (answer) {
        switch (answer.action) {
            case "View all employees":
                viewAll();
                break;

            case "View employees by department":
                viewByDept();
                break;

            case "View employees by manager":
                viewByMan();
                break;

            case "View all roles":
                viewRoles();
                break;

            case "Add new employee":
                addEmp()
                break;

            case "Remove Employee":
                removeEmp();
                break;

            case "Update Employee Role":
                updateEmpRole();
                break;

            case "Update Employee Manager":
                updateEmpMan();
                break;

        }
    })

}


function viewAll() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, employee.role_id, role.title, role.salary, department.id, department.name FROM employee INNER JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        menu();
    });
}

function viewByDept() {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id WHERE ?";
    inquirer.prompt({
        name: "dept",
        type: "list",
        message: "Which department would you like to view?",
        choices: departments
    }).then(function (answer) {
        connection.query(query, { name: answer.dept }, function (err, res) {
            if (err) throw err;
            console.table(res);
            menu();
        })

    })
}

function viewByMan() {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id WHERE ?";
    inquirer.prompt({
        name: "man",
        type: "list",
        message: "Select manager ID number",
        choices: managers
    }).then(function (answer) {
        connection.query(query, { manager_id: answer.man }, function (err, res) {
            if (err) throw err;
            console.table(res);
            menu();
        })

    })
}

function viewRoles() {

    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id WHERE ?";
    inquirer.prompt({
        name: "role",
        type: "list",
        message: "Which roles would you like to view?",
        choices: roles
    }).then(function (answer) {
        connection.query(query, { title: answer.role }, function (err, res) {
            if (err) throw err;
            console.table(res);
            menu();
        })

    })
}

function addEmp() {

    inquirer
        .prompt([
            {
            name: "empid",
            type: "input",
            message: "ID number of new employee:"
        },
            {
                name: "empfirst",
                type: "input",
                message: "First name:"
            },
            {
                name: "emplast",
                type: "input",
                message: "Last name"
            },
            {
                name: "emprole",
                type: "list",
                message: "Role ID:",
                choices: roleIds

            },
            {
                name: "empman",
                type: "list",
                message: "Manager ID",
                choices: managers
            
            }]).then(function (answer) {
                var numid= Number(answer.empid);
                console.log(numid);
                console.log(typeof answer.empid);
                connection.query('INSERT INTO employee SET ?', { id: numid, first_name: answer.empfirst, last_name:answer.emplast, role_id: answer.emprole, manager_id: answer.empman},
                function (err, res) {
                    if (err) throw err;
                    console.log(`${answer.empfirst} ${answer.emplast} has been added to the database`);
                    menu();
                });

            })
}


function removeEmp() {

    inquirer
        .prompt({
            name: "remove",
            type: "input",
            message: "ID number of employee to remove:"
        })
        .then(function (answer) {
            var query = `DELETE FROM employee WHERE id = ${answer.remove}`;
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log(`Employee number ${answer.remove} has been removed.`)


            });
        });
    }

function updateEmpRole() { }

function updateEmpMan() { }

