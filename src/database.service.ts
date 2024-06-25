import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class MySQLService {
  private connection: mysql.Connection;

  constructor() {
    this.init();
  }

  async init() {
    this.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'eco-tracking',
    });
  }

  async query(sql: string, params: any[] = []) {
    const [results] = await this.connection.execute(sql, params);
    return results;
  }
}
