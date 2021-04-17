import { Knex, knex } from 'knex'

interface IDataConnection {
  host: string;
  user: string;
  password: string;
  database: string;
}


export = function connection(connection: IDataConnection) {
  const config: Knex.Config = {
    client: 'mysql2',
    connection: connection
  };
  
  return knex(config)
}