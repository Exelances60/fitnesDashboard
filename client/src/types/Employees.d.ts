interface IEmployee {
  _id: string;
  profilePicture?: string;
  name: string;
  phone?: string;
  email?: string;
  age?: number;
  position?: string;
  address?: string;
  hireDate?: Date;
  salary?: number;
  university?: string;
  education?: string;
  documents?: string[];
  ownerId: string;
  customers?: CustomerType[];
}
