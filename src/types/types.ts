export interface IApiResponse {
  code: number;
  type: string;
  message: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ITag {
  id: number;
  name: string;
}

export enum Status {
  AVAILABLE = "available",
  PENDING = "pending",
  SOLD = "sold",
}

export interface IPet {
  id: number;
  category: ICategory;
  name: string;
  photoUrls: string[];
  tags: ITag[];
  status: Status;
}

export interface IOrder {
  id: number;
  petId: number;
  quantity: number;
  shipDate: string;
  status: Status;
  complete: boolean;
}

export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: Status;
}

export interface PetResponse {
  data: IPet[];
}
