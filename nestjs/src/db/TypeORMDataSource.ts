import { DataSource } from "typeorm"

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3309,
  username: 'root',
  password: 'root_password_giftsdb',
  database: 'giftsdb',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  synchronize: false,
})

export default dataSource
