module.exports = {
  dialect: 'postgres',
  host: 'database-1.cyqrbbkklyrq.sa-east-1.rds.amazonaws.com',
  username: 'postgres',
  password: 'postgres',
  database: 'gobarber',
  define: {
    timestamps: true, 
    underscored: true,
    underscoredAll: true 
  }
}