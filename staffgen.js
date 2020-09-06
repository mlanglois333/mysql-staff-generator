const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")
var connection = mysql.createConnection({
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

function init() {

    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Choose an option from the list:",
        choices: [
            "View all employees",
            "View employees by department",
            "View employees by manager",
            "View all roles",
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

function viewAll() { }

function viewByDept() { }

function viewByMan() { }

function viewRoles() { }

function removeEmp() { }

function updateEmpRole() { }

function updateEmpMan() { }

