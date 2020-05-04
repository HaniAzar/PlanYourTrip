export class Users {

      id:number;
      userName:string; 
      eMail:string;
      address :string;
      password :string;
      constructor(userName,eMail,address,password){
            this.userName=userName;
            this.eMail=eMail;
            this.address=address;
            this.password=password;

      }
}
