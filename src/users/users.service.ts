import { Injectable } from '@nestjs/common';


// This should be a real class/interface representing a user entity
export type User = any;
@Injectable()
export class UsersService {

  constructor() {}
    private readonly users = [
        {
          userId: 1,
          username: 'john',
          password: 'changeme',
        },
        {
          userId: 2,
          username: 'maria',
          password: 'guess',
        },
      ];

     async findOne(username:string):Promise<User | undefined>{
          return this.users.find(user=>user.username===username)
      }

      async create(item: any) {
        // const sql = 'INSERT INTO users (username,email,password) VALUES (?, ?,?)';
        // return this.mySQLService.query(sql, [item.username, item.email,item.password]);
      }
}
