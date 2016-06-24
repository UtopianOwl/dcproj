interface IUser {
  _id: any;
  email: string;
  username:string;
  password: string;
  salt: string;
  fullname: string;
  location: string;
  cars: Array<string|ICar>;
}
