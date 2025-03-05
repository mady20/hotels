
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const hotelsFilePath = path.join(__dirname, '../data/hotels.json');


const readUsersData = () => {
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data);
};

const writeUsersData = (data) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), "utf8");
};



const readHotelsData = () => {
    const data = fs.readFileSync(hotelsFilePath, "utf8");
    return JSON.parse(data);
}   

const writeHotelsData = (data) => {
    fs.writeFileSync(hotelsFilePath, JSON.stringify(data, null, 2), "utf8");
}


module.exports = { readUsersData, writeUsersData, readHotelsData, writeHotelsData };
