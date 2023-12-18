export class Patient {
    id: number;
    lastName: string;
    gender: string;
    dateOfBirth: Date;
    address: string;
    phoneNumber: string;
    email: string;
    ec_name: string;
    ec_patientRelationship: string;
    ec_phoneNumber: string;
  
    constructor() {
      this.id = 0;
      this.lastName = '';
      this.gender = '';
      this.dateOfBirth = new Date();
      this.address = '';
      this.phoneNumber = '';
      this.email = '';
      this.ec_name = '';
      this.ec_patientRelationship = '';
      this.ec_phoneNumber = '';
    }
  }
  