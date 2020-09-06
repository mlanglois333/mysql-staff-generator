const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")
let departments = ["Human Resources", "Development", "Facilities"];
let managers = ["2", "333", "444", "555"]
let roles = []
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

    connection.query(qu, function(err, res){
        if (err) throw err;
        console.table(res);
    })
}

function init() {
var query = "SELECT employee.first_name, employee.last_name, role.title, department.name FROM employee INNER JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id" ;
console.log("Welcome to the staff database! Here are our current employees:")
connection.query(query, function(err,res){
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


function viewAll() { 
    var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, employee.role_id, role.title, role.salary, department.id, department.name FROM employee INNER JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id" ;
    connection.query(query, function(err,res){
        if (err) throw err;
        console.table(res);
        menu();
    });
}

function viewByDept() {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id WHERE ?" ;
    inquirer.prompt({
        name: "dept",
        type: "list",
        message: "Which department would you like to view?",
        choices: departments
        }).then(function (answer) {
            connection.query(query, {name: answer.dept}, function(err, res){
                if (err) throw err;
               console.table(res); 
            })
            
    })
}

function viewByMan() {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id WHERE ?" ;
    inquirer.prompt({
        name: "man",
        type: "list",
        message: "Select manager ID number",
        choices: managers
        }).then(function (answer) {
            connection.query(query, {manager_id: answer.man}, function(err, res){
                if (err) throw err;
               console.table(res); 
            })
            
    })
 }

function viewRoles() {

    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id WHERE ?" ;
    inquirer.prompt({
        name: "role",
        type: "list",
        message: "Which roles would you like to view?",
        choices: roles
        }).then(function (answer) {
            connection.query(query, {name: answer.dept}, function(err, res){
                if (err) throw err;
               console.table(res); 
            })
            
    })
 }

function removeEmp() { }

function updateEmpRole() { }

function updateEmpMan() { }

