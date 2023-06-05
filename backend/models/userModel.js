const { connection } = require("../config/db")

function getUsers() {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM user`
        connection.query(sqlQuery, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getUserById(id) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM user WHERE id = ${id}`
        connection.query(sqlQuery, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

function createUser(user) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO user SET ?`
        connection.query(sqlQuery, user, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function updateUser(id, user) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE user SET ? WHERE id = ${id}`;
        connection.query(sqlQuery, [user], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.affectedRows > 0);
            }
        });
    });
}

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM user WHERE id = ${id}`
        connection.query(sqlQuery, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};