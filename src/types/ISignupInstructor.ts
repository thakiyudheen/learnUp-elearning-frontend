interface Profile {
    dateOfBirth: string;
    gender: string;
    avatar:string;
  }
  
  interface Contact {
    phone: string;
    address?: string
    socialMedia: {
      linkedIn: string;
    };
  }
  
 export interface SignupData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: string;
    cv?: string;
    profile: Profile;
    contact: Contact;
    isVerified: boolean;
    profession: string;
    isGauth ?: boolean;
  }