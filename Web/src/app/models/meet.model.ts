
// export class Meet{
//   constructor( public id: string, 
//                public preview: string,
//                public title: string,
//                public description: string
//                ){}
// }

export class Meet{
  constructor( public id: number, 
               public image: string,
               public name: string,
               public date: string,
               public description: string,
               public address: string,
               public maxUsers: number
               ){}
}


// {
//   "image": "string",
//   "name": "string",
//   "description": "string",
//   "date": "2023-12-19T17:34:20.876Z",
//   "address": "string",
//   "maxUsers": 0,
//   "authorId": 0
// }