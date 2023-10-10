import { Sequelize } from "sequelize";

const db = new Sequelize('xwcgsgnz', 'xwcgsgnz', 'ZE86gl8QP4XoTeXTev7kwi_1OIxX7eqT', {
    host: 'silly.db.elephantsql.com',
    dialect: "postgres",
    logging: true
})

export default db