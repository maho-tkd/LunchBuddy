// require("dotenv").config({ path: "./.env.local" });

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "lunch-buddy.c5o2uao42si7.us-east-1.rds.amazonaws.com",
      user: "postgres",
      password: "lunchbuddypostgres",
      database: "tmp_db",
      port: 5432,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    // migrations: {
    //   directory: "./db/migrations",
    // },
    // seeds: {
    //   directory: "./db/seeds",
    // },
  },
};
