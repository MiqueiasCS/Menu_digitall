const devEnv = {
  type: "postgres",
  host: "localhost",
  port: "5431",
  database: "menu_digital",
  username: "admin",
  password: "12345",
  entities: ["./src/Entities/**/*.ts"],
  migrations: ["./src/Database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/Database/migrations",
  },
  logging: true,
  synchronize: false,
};

const prodEnv = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['./dist/src/entities/**/*.js'],
  migrations: ['./dist/src/database/migrations/*.js'],
  cli: {
      migrationsDir: './dist/src/database/migrations'
  },
  synchronize: true,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,

}

let exportModule

if (process.env.NODE_ENV === 'production') {
  exportModule = prodEnv
} else {
  exportModule = devEnv
}

module.exports = exportModule;
