import { IApiResponse, ICategory, IOrder, IPet, ITag, IUser, Status } from "./types"

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
    userStatus: Status.PENDING,
};

export const initOrder: IOrder = {
    id: 0,
    petId: 0,
    quantity: 0,
    shipDate: new Date().toISOString(),
    status: Status.PENDING,
    complete: false,
};