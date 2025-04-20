
interface StudentInterface {

    id: string;

    firstName: string;

    paternalSurname: string;

    maternalSurname: string;

    career: string;

    skills?: string[];

    languages?: string[];

    cv_url?: string;

    contact_email: string;

    phone_number: string;

    user: any;

    createdAt: Date;

    deletedAt: Date; 
}

export default StudentInterface;