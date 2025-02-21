export type AssetType =
  | 'APARTMENT'
  | 'LAND'
  | 'VEHICLE'
  | 'MARKET_STALLS'
  | 'MACHINERY'
  | 'LAND_AND_IMPROVEMENT'
  | 'OTHER';

export type OwnershipType = 'INDIVIDUAL' | 'GROUP' | 'COMPANY';

interface BaseAsset {
  assetType: AssetType;
  title: string;
  ownershipType: OwnershipType;
  proposedValue: number;
  documents: string[];
  application: {
    id: string;
  };
}

interface OwnerInfo {
  fullName: string;
  dayOfBirth: string;
  idCardNumber: string;
  permanentAddress: string;
}

// Apartment Asset
export interface ApartmentAsset extends BaseAsset {
  assetType: 'APARTMENT';
  apartment: {
    plotNumber: string;
    mapNumber: string;
    address: string;
    area: number;
    purpose: string;
    name: string;
    floorArea: number;
    typeOfHousing: string;
    typeOfOwnership: string;
    certificateNumber: string;
    certificateBookNumber: string;
    issuingAuthority: string;
    ownerInfo: OwnerInfo;
  };
}

// Land Asset
export interface LandAsset extends BaseAsset {
  assetType: 'LAND';
  landAsset: {
    plotNumber: string;
    mapNumber: string;
    address: string;
    area: number;
    purpose: string;
    expirationDate: string;
    originOfUsage: string;
    ownerInfo: OwnerInfo;
  };
}

// Vehicle Asset
export interface VehicleAsset extends BaseAsset {
  assetType: 'VEHICLE';
  vehicle: {
    ownerName: string;
    address: string;
    engineNumber: string;
    chassisNumber: string;
    brand: string;
    modelNumber: string;
    vehicleType: string;
    engineCapacity: number;
    color: string;
    loadCapacity: string;
    seatCapacity: number;
    registrationExpiryDate: string;
    licensePlateNumber: string;
    firstRegistrationDate: string;
    issueDate: string;
    registrationCertificateNumber: string;
    kilometersDriven: number;
    inspectionCertificateNumber: string;
  };
}

// Market Stalls Asset
export interface MarketStallsAsset extends BaseAsset {
  assetType: 'MARKET_STALLS';
  marketStalls: {
    stallName: string;
    ownerName: string;
    category: string;
    areaSize: number;
    rentPrice: number;
    rentStartDate: string;
    rentEndDate: string;
    location: string;
    contactNumber: string;
    isOccupied: boolean;
  };
}

// Machinery Asset
export interface MachineryAsset extends BaseAsset {
  assetType: 'MACHINERY';
  machinery: {
    name: string;
    model: string;
    manufacturer: string;
    manufactureDate: string;
    purchaseDate: string;
    purchasePrice: number;
    serialNumber: string;
    location: string;
    status: string;
  };
}

// Land and Improvement Asset
export interface LandAndImprovementAsset extends BaseAsset {
  assetType: 'LAND_AND_IMPROVEMENT';
  landAndImprovement: {
    plotNumber: string;
    mapNumber: string;
    address: string;
    area: number;
    purpose: string;
    typeOfHousing: string;
    floorArea: number;
    ancillaryFloorArea: string;
    structureType: string;
    numberOfFloors: number;
    constructionYear: number;
    typeOfOwnership: string;
    certificateNumber: string;
    certificateBookNumber: string;
    issuingAuthority: string;
    issueDate: string;
  };
}

// Other Asset
export interface OtherAsset extends BaseAsset {
  assetType: 'OTHER';
  otherAsset: {
    metadata: {
      assetDescription: string;
      category: string;
      specifications: string;
      condition: string;
      [key: string]: any;
    };
  };
}

export type Asset =
  | ApartmentAsset
  | LandAsset
  | VehicleAsset
  | MarketStallsAsset
  | MachineryAsset
  | LandAndImprovementAsset
  | OtherAsset;

export interface AssetMetadata {
  proposedValue: number;
  assetType: AssetType;
  documents: string[];
  title: string;
  ownershipType: OwnershipType;
  application: {
    id: string;
  };
  apartment: ApartmentAsset['apartment'] | null;
  landAsset: LandAsset['landAsset'] | null;
  vehicle: VehicleAsset['vehicle'] | null;
  marketStalls: MarketStallsAsset['marketStalls'] | null;
  machinery: MachineryAsset['machinery'] | null;
  landAndImprovement: LandAndImprovementAsset['landAndImprovement'] | null;
  otherAsset: OtherAsset['otherAsset'] | null;
}

export interface AssetResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  lastModifiedBy: string;
  createdBy: string;
  status: 'WAIT' | 'APPROVED' | 'REJECTED';
  type: 'CREATE_ASSETS';
  referenceIds: string[] | null;
  approvedAt: string | null;
  metadata: AssetMetadata[];
  application: {
    id: string;
  };
  deleted: boolean;
}

// Add API Error types
export interface ApiErrorResponse {
  code: number;
  message: string;
  errors?: Array<{
    code?: string;
    field?: string;
    message: string;
  }>;
}

export interface AssetApiError extends Error {
  response?: {
    data: ApiErrorResponse;
    status: number;
  };
  isAxiosError: boolean;
}

// Asset Response codes
export type AssetResponseCode = 200 | 400 | 422 | 500;

// Update AddAssetsResponse
export interface AddAssetsResponse {
  code: AssetResponseCode;
  message: string;
  result?: AssetResponse;
  error?: ApiErrorResponse;
}

// Export type for all possible error responses

// Update the service to use these types:
export interface AddAssetServiceError extends Error {
  response?: {
    message: string;
    status: number;
  };
}
