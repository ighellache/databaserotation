const db = require('../database/db');

const select_all_users = db.prepare (
    `SELECT * FROM user `
);

function getAllUsers() {
    return select_all_users.all();
}

//console.log(getAllUsers())

const select_all_tasks = db.prepare (
    `SELECT * FROM tasks `
);

function getAllTasks() {
    return select_all_tasks.all();
}

//console.log(getAllTasks())

const connect = db.prepare (
    `
    SELECT 
    tasks.id, 
    tasks.name, 
    tasks.description, 
    tasks.task_points, 
    user.name AS user_name, 
    tasks.space_id, 
    tasks.is_done
    FROM tasks
    JOIN user ON tasks.user_id = user.id;`
);
function displayConnection(){
    return connect.all();
}

//console.log(displayConnection())

//now implement rotation system

const listofnames = db.prepare (
    `SELECT name FROM user`
);

function displaylistofnames() {
    return listofnames.all();
}
console.log(displaylistofnames()); //[ { name: 'Iman' },{ name: 'Georgia' },{ name: 'Natalia' },{ name: 'Karol' }]

//rotation system:
const users = displaylistofnames(); 
const tasks = displayConnection(); //all the tasks 

// Extract distinct user names from tasks
const names = [...new Set(tasks.map(task => task.user_name))]; //make an array of all user_names extracted from the tasks 
//console.log(userNames); //[ 'Iman', 'Georgia', 'Natalia', 'Karol' ]

let nameposition = names[0]
// Get index of current user name in names array
for (let i = 0; i < names.length; i++) {
    if (names[i] === 'Iman') {
        tasks.user_name == 'Georgia';
    } else if (names[i] === 'Georgia') {
        tasks.user_name == 'Natalia';
    } else if (names[i] === 'Natalia') {
        tasks.user_name == 'Karol';
    } else if (names[i] === 'Karol') {
        tasks.user_name == 'Iman';
    }
}
// define nextPerson function
function nextPerson() {
  console.log(names[nameposition]);
  nameposition = (nameposition + 1) % names.length;
}

//nextPerson()

