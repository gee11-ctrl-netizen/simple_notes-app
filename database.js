import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config();


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_NAME

}).promise();

async function initializeDatabase() {
    try {

        // Create table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS notes (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                info TEXT NOT NULL,
                created TIMESTAMP DEFAULT NOW()
            )
        `);

        console.log('Table created successfully!')

        //check if the user exists

        const [rows] = await pool.query(`SELECT COUNT(*) AS count FROM  notes`);
        if (rows[0].count === 0) {
            await pool.query(`INSERT INTO notes (title,info)
                VALUES('My first Note', 'This is a note about my fckn life'),
                ('My second note', 'This is the second note about one man')`);

            console.log('Records insterted successfully!')
        } else {
            console('Records already exist.')
        }



    } catch (error) {
        console.log('Error initializing the database!')

    }

}


initializeDatabase();