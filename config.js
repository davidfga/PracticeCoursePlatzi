module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    post:{
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notSecret!'
    },
    mysql:{
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || '5C6Au8NddU',
        password: process.env.MYSQL_PASS || '3PoLSM54Gi',
        database: process.env.MYSQL_DB || '5C6Au8NddU',
    },
    mysqlService:{
        host: process.env.MYSQL_SRV_HOST|| 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    }
}