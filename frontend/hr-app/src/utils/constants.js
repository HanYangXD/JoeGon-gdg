

export const THEME_STATE = {
    DARK: 'dark',
    LIGHT: 'light',
    SYSTEM: 'system'
}

export const THEME_OPTIONS = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'system', label: 'System' }
]


export const USER_ROLES = {
    ADMIN: "Admin",
    HR: "HR",
    CANDITATE: "Candidate"
}

export const USER_OPTIONS = [
    { value: 'admin', label: USER_ROLES.ADMIN },
    { value: 'hr', label: USER_ROLES.HR },
    { value: 'candidate', label: USER_ROLES.CANDITATE }
]

export const INITIAL_USER_TOKEN = {
    userId: "CA123",
    userRole: USER_ROLES.CANDITATE,
    //userName: "John Doe"
}