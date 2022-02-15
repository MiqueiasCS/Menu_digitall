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

module.exports = devEnv;
