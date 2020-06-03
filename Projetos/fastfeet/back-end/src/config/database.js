module.exports = {
    dialect: 'postgres',
    host: 'ec2-35-174-127-63.compute-1.amazonaws.com',
    username: 'ujdqmmlolmqvio',
    password: '2d10b189faf85290d6f83492cc1b6c5a583e154f4463f143d9c3934a9ef4d6d5',
    database: 'd7o3aeivkus6jh',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    },
    dialectOptions : { 
        ssl : {
            require: true,
            rejectUnauthorized: false 
        }
    } 
}