export class Product {
    static max_num=0;
    constructor(public ref :string | null = null,
                public label : string ="",
                public price : number = 0,
                public description : string = ""){
                    if(ref==null){
                        Product.max_num++;
                        this.ref=`p_${ Product.max_num}`;
                    }
                }
}