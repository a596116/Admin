interface IUser {
    id: string
    name: string
    phone: string
    password: string
    avatar?: string
    status: boolean
    permissions: string[]
    UserRole: UserRole[]
    created_at?: string
    updated_at?: string
}

interface UserRole {
    id: number
    userId: number
    roleId: number
    role: Role
}

interface Role {
    id: number
    name: string
    permissions: Permission[]
}

interface Permission {
    id: number
    name: string
}

interface Login {
    token: string
    userId: number
}

