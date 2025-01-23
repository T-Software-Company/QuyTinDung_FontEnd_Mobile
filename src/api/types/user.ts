export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  signaturePhoto?: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
  identityInfo: IdentityInfo;
}

interface Address {
  country: string;
  cityProvince: string;
  district: string;
  wardOrCommune: string;
  streetAddress: string;
  detail?: string;
}

interface IdentityInfo {
  identifyId: string;
  backPhotoUrl: string;
  frontPhotoUrl: string;
  dateOfBirth: string;
  ethnicity: string;
  expirationDate: string;
  issueDate: string;
  gender: string;
  issuingAuthority: string;
  legalDocType: string;
  nationality: string;
  permanentAddress: string;
  placeOfBirth: string;
  religion: string;
}
