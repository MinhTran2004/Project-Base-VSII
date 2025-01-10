export interface IApiResponse {
    code: number,
    type: string,
    message: string,
}

export interface ICategory {
    id: number,
    name: string,
}

export interface ITag {
    id: number,
    name: string,
}

export enum Status {
    AVAILABLE = "available",
    PENDING = "pending",
    SOLD = "sold",
}

export interface IPet {
    id: number,
    category: ICategory,
    name: string,
    photoUrl: string[],
    tags: ITag[],
    status: Status
}

export interface IOrder {
    id: number,
    petId: number,
    quantity: number,
    shipDate: string,
    status: Status,
    complete: boolean,
}

export interface IUser {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    userStatus: number,
}
// start
export interface IAccount {
    value: {
        email: string,
        password: string,
    },
    textError: {
        errorEmail: string,
        errorPassword: string,
    }
}

export interface IRefAccount {
    refUsername: React.RefObject<HTMLInputElement>,
    refPassword: React.RefObject<HTMLInputElement>,
}

export interface IFormFieldUser {
    formData: {
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        phone: string,
        userStatus: number,
    },
    textError: {
        errorUserName: string,
        errorFirstName: string,
        errorLastName: string,
        errorEmail: string,
        errorPassword: string,
        errorPhone: string,
    },
    isStatusButton: boolean,
}

export interface IRefFormFieldUser {
    refUsername: React.RefObject<HTMLInputElement>,
    refFirstName: React.RefObject<HTMLInputElement>,
    refLastName: React.RefObject<HTMLInputElement>,
    refEmail: React.RefObject<HTMLInputElement>,
    refPassword: React.RefObject<HTMLInputElement>,
    refPhone: React.RefObject<HTMLInputElement>,
}