export class Login {
    constructor(public username :string ="?",
                public password : string ="",
                public roles : string = ""){}
}

export class LoginResponse {
    constructor(
    public username : string ="",
    public status : boolean = false,
    public message : string ="" ,
    public token : string|null= null,
    public scope : string = ""
        ){}
}  