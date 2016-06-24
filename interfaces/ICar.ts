interface ICar {
    _id:any;
    model:string;
    imageUrl:string;
    brand:string;
    year:number;
    owner:string | IUser;
}
