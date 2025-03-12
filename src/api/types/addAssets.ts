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
    ownershipTerm: string;
    notes: string;
    sharedFacilities: string;
    certificateNumber: string;
    certificateBookNumber: string;
    issuingAuthority: string;
    issueDate: string;
    expirationDate: string;
    originOfUsage: string;
    metadata: {
      parkingSpace: string;
      floor: number;
      view: string;
      renovationStatus: string;
    };
    ownerInfo: OwnerInfo;
    transferInfo: {
      fullName: string;
      dayOfBirth: string;
      idCardNumber: string;
      permanentAddress: string;
      transferDate: string;
      transferRecordNumber: string;
    };
  };
}

// Form data type for the apartment component
export interface ApartmentFormData extends Omit<ApartmentAsset, 'application'> {
  application: {id: string};
  [key: string]: any; // Index signature to allow dynamic access
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
    transferInfo: {
      fullName: string;
      dayOfBirth: string;
      idCardNumber: string;
      permanentAddress: string;
      transferDate: string;
      transferRecordNumber: string;
    };
    metadata: {
      zoning: string;
      frontage: string;
      landUseRights: string;
      developmentPotential: string;
    };
  };
}

// Form data type for the land component
export interface LandFormData extends Omit<LandAsset, 'application'> {
  application: {id: string};
  [key: string]: any; // Index signature to allow dynamic access
}

// Vehicle Asset
interface VehicleMetadata {
  fuelType: string;
  transmission: string;
  lastService: string;
  warranty: string;
  insuranceCost?: number;
  annualTax?: number;
  [key: string]: any; // Add index signature to allow dynamic access
}

export interface VehicleAsset extends BaseAsset {
  assetType: 'VEHICLE';
  vehicle: {
    model: string;
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
    note: string;
    kilometersDriven: number;
    inspectionCertificateNumber: string;
    metadata: VehicleMetadata;
  };
}

// Form data type for the vehicle component
export interface VehicleFormData extends Omit<VehicleAsset, 'application'> {
  application: {id: string};
  [key: string]: any; // Index signature to allow dynamic access
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
    note: string;
    metadata: {
      utilities: string;
      stallNumber: string;
      refrigeration: string;
      storageSpace: string;
    };
  };
}

// Form data type for the market stalls component
export interface MarketStallsFormData
  extends Omit<MarketStallsAsset, 'application'> {
  application: {id: string};
  [key: string]: any; // Index signature to allow dynamic access
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
    note: string;
    metadata: {
      warranty: string;
      maintenanceSchedule: string;
      powerConsumption: string;
      precision: string;
    };
  };
}

// Form data type for the machinery component
export interface MachineryFormData extends Omit<MachineryAsset, 'application'> {
  application: {id: string};
  [key: string]: any; // Index signature to allow dynamic access
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
    expirationDate: string;
    originOfUsage: string;
    typeOfHousing: string;
    floorArea: number;
    ancillaryFloorArea: string;
    structureType: string;
    numberOfFloors: number;
    constructionYear: number;
    typeOfOwnership: string;
    ownershipTerm: string;
    notes: string;
    sharedFacilities: string;
    certificateNumber: string;
    certificateBookNumber: string;
    issuingAuthority: string;
    issueDate: string;
    ownerInfo: {
      fullName: string;
      dayOfBirth: string;
      idCardNumber: string;
      permanentAddress: string;
    };
    transferInfo: {
      fullName: string;
      dayOfBirth: string;
      idCardNumber: string;
      permanentAddress: string;
      transferDate: string;
      transferRecordNumber: string;
    };
    metadata: {
      constructionPermit: string;
      lastRenovation: string;
      buildingMaterials: string;
      parkingSpaces: number;
    };
  };
}

// Form data type for the component (can be exported for use in the component)
export interface LandAndImprovementFormData
  extends Omit<LandAndImprovementAsset, 'application'> {
  application: {id: string};
  [key: string]: any; // Index signature to allow dynamic access
}

export interface ArtPiece {
  name: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: string;
  value: number;
}

interface Insurance {
  provider: string;
  policyNumber: string;
  coverage: number;
}

interface Storage {
  location: string;
  security: string;
}

export interface OtherAssetMetadata {
  assetType: string;
  location: string;
  pieces: ArtPiece[];
  insurance: Insurance;
  storage: Storage;
}

export interface OtherAsset extends BaseAsset {
  assetType: 'OTHER';
  otherAsset: {
    metadata: OtherAssetMetadata;
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
