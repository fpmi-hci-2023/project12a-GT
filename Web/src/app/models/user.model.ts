// export interface User {
//   username: string;
//   firstName: string;
//   lastName: string;
//   avatar: File | null;
//   password: string;
// }

export class User{
  constructor( public id: string,
               public username: string,
               public firstName: string,
               public lastName: string,
               public avatar: File | null,
               public password: string
               ){}
}

export class UserDTO{
  constructor( public id: number,
               public username: string,
               public name: string,
               public surname: string,
               public avatar: string,
               public description: string
               ){}
}