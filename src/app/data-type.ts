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
}

export interface UserWithRoles {
    Id: string,
    UserName: string,
    UserEmail: string,
    UserPassword: string,
    UserPhone: string,
    Role: string,
}