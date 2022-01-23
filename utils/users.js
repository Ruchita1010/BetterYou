const users = [];

// Join user to chat
const userJoin = (id, username, room) => {
    const user = {
        id, 
        username, 
        room, 
        days:0,
        color: getColor()
    };
    users.push(user);
    return user;
}

// Get the current user
const getCurrentUser = (id) => {
    return users.find(user => user.id === id);
}

// Get room users
const getRoomUsers = (room) => {
    console.log(users);
    return users.filter(user => user.room === room);
}

function getColor() {
    const color = `rgb(${generateRandomColor(255)}, ${generateRandomColor(255)}, ${generateRandomColor(255)})`;
    return color;
}

//For random color
function generateRandomColor(num) {
    return Math.floor(Math.random() * (num));
}


module.exports = {
    userJoin,
    getCurrentUser,
    getRoomUsers
}