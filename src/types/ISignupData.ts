enum Role {
    pending='pending',
    student='student',
    teacher='instructor',
    admin='admin'
}

enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

enum Profession {
    student = 'student',
    working = 'working'
}

interface Contact {
    phone?: string,
    socialMedia: {
        linkedIn: string;
      };
    
}

interface Profile {
    avatar?: string,
    dateOfBirth?: string,
    gender?: Gender
}



export interface SignupFormData {
    email?: string ,
    password?: string,
    confirmPassword?: string
    firstName?: string,
    lastName?: string,
    username?: string,
    profile?: Profile,
    contact?: Contact,
    profession?: Profession,
    qualification?: string,
    address?:string,
    avatar?:string,
    role?: Role,
    isVerified: boolean,
    isGauth?: boolean,
    cv?:string,
    isReject?:boolean
}

export interface LoginFormData {
    email: string,
    password: string
}