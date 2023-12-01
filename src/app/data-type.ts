export interface SignUp {
    id: string,
    name: string,
    email: string,
    userPhone: string,
    password: string,
    role: string,
}
export interface Login {
    email: string,
    password: string
}

export interface Product {
    id: string,
    name: string,
    price: number,
    color: string,
    catagory: string,
    description: string,
    ImageFiles:File[],
    productImages:any[],       
    quantity:undefined | number,
    productId:undefined|string,
    imagePaths:any[],
}
export interface Cart{
    id: string | undefined,
    name: string,
    price: number,    
    catagory: string,
    description: string,
    ImageFiles:File[],
    productImages:any[],   
        
    color: string,
    quantity:undefined | number,
    userId:string,
    productId:string,
    
    // imagePaths:undefined|any[]
}
export interface UserWithRoles {
    Id: string,
    UserName: string,
    UserEmail: string,
    UserPassword: string,
    UserPhone: string,
    role: string,
    activityStatus:string,
}
export interface PriceSummery{
    price:number,
    discount:number,
    // quantity:number,
    tax:number,
    deliveryCharge:number,
    total:number
}

export interface Order{
    id:number|undefined,
    email:string,
    name:string;
    contact:string;
    totalPrice:number,
    userId:number,
    address:string
}