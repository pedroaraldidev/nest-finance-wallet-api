

const validDbTypes = ['mysql', 'postgres', 'sqlite'] as const;
const typeDb = (process.env.DB_TYPE?.toLowerCase() ?? 'sqlite') as (typeof validDbTypes)[number];
export default {
  type: typeDb,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: typeDb === 'sqlite' ? ':memory:' : process.env.DB_NAME, 
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
