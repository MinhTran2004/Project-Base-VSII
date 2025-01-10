import React from "react"
import { IAccount, IApiResponse, ICategory, IFormFieldUser, IOrder, IPet, IRefAccount, IRefFormFieldUser, ITag, IUser, Status } from "./types"

const initCategory: ICategory = {
    id: 0,
    name: "",
}

const initTags: ITag[] = [
    {
        id: 0,
        name: "",
    },
]

export const initApiResponse: IApiResponse = {
    code: 0,
    type: "",
    message: "",
}

export const initPet: IPet = {
    id: 0,
    category: initCategory,
    name: "",
    photoUrl: [
        ""
    ],
    tags: initTags,
    status: Status.PENDING
}

export const initUser: IUser = {
    id: 0,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    userStatus: 0,
};

export const initOrder: IOrder = {
    id: 0,
    petId: 0,
    quantity: 0,
    shipDate: new Date().toISOString(),
    status: Status.PENDING,
    complete: false,
};

export const initAccount: IAccount = {
    value: {
        email: '',
        password: '',
    },
    textError: {
        errorEmail: '',
        errorPassword: '',
    }
}

export const initRefAccount: IRefAccount = {
    refUsername: React.createRef<HTMLInputElement>(),
    refPassword: React.createRef<HTMLInputElement>(),
}

export const initFormFieldUser: IFormFieldUser = {
    formData: {
        username: "asd",
        firstName: "asd",
        lastName: "asd",
        email: "tranminh209204@gmail.com",
        password: "123456",
        phone: "0987654321",
        userStatus: 0,
    },
    textError: {
        errorUserName: '',
        errorFirstName: '',
        errorLastName: '',
        errorEmail: '',
        errorPassword: '',
        errorPhone: '',
    },
    isStatusButton: true,
}

export const initRefFormFieldUser: IRefFormFieldUser = {
    refUsername: React.createRef<HTMLInputElement>(),
    refFirstName: React.createRef<HTMLInputElement>(),
    refLastName: React.createRef<HTMLInputElement>(),
    refEmail: React.createRef<HTMLInputElement>(),
    refPassword: React.createRef<HTMLInputElement>(),
    refPhone: React.createRef<HTMLInputElement>(),
}