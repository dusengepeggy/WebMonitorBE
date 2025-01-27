import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL as string
const sql = postgres(connectionString,{
    ssl:{
        rejectUnauthorized: false
    }
})

export default sql