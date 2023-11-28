enum genderTypes{
    m = "masculino",
    f = "femenino",
    ne = "no especificado"
}

export interface NewUserFields{
    names: string;
    lastNames: string;
    age: number;
    gender: genderTypes;
    email: string;
    isVerify: boolean;
    photo?: string;
    phone?: {
        phoneCode: string;
        phoneNumbre: string;
        iso: string;
    } | null;
}

export interface NewUserFields2{
    names: string;
    lastNames: string;
    email: string;
    password: string;
    photo?: string;
}

export interface GetUserFields{
    names: string;
    lastNames: string;
    email: string;
    password: string;
    photo?: string;
    id: number;
}