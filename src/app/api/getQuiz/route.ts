import { NextResponse } from 'next/server'

const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'tpc12351744', 
    database: 'Quiz',
})

export async function GET() {
    try {
        const connection = await pool.getConnection()
        const [rows] = await connection.query('SELECT * FROM QuizList')
        connection.release()
        return NextResponse.json(rows)
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}