interface IUser {
    id: string
    name: string
    phone: string
    password: string
    avatar?: string
    active: string
    permissions: string[]
    createdAt?: string
    updatedAt?: string
}

interface Login {
    token: string
    userPhone: string
}
