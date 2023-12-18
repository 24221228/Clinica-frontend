export interface User{
    name: string;
    lastName: string;
    phone: string;
    roles: Role;
}

export interface Role{
    id: number;
    name: string;
}