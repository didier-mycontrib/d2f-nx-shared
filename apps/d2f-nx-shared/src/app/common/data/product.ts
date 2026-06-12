export class Product {
    constructor(public ref :string | null = null,
                public label : string ="",
                public price : number = 0,
                public description : string = ""){}
}