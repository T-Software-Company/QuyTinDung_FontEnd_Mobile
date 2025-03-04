export const apartmentFields = [
  {field: 'plotNumber', label: 'Số thửa', placeholder: 'Nhập số thửa'},
  {field: 'mapNumber', label: 'Số tờ bản đồ', placeholder: 'Nhập số tờ bản đồ'},
  {field: 'address', label: 'Địa chỉ', placeholder: 'Nhập địa chỉ'},
  {
    field: 'area',
    label: 'Diện tích (m²)',
    placeholder: 'Nhập diện tích',
    numeric: true,
  },
  {
    field: 'purpose',
    label: 'Mục đích sử dụng',
    placeholder: 'Nhập mục đích sử dụng',
  },
  {field: 'name', label: 'Tên căn hộ', placeholder: 'Nhập tên căn hộ'},
  {
    field: 'floorArea',
    label: 'Diện tích sàn (m²)',
    placeholder: 'Nhập diện tích sàn',
    numeric: true,
  },
  {field: 'typeOfHousing', label: 'Loại nhà ở', placeholder: 'Nhập loại nhà ở'},
  {
    field: 'typeOfOwnership',
    label: 'Hình thức sở hữu',
    placeholder: 'Nhập hình thức sở hữu',
  },
  {
    field: 'certificateNumber',
    label: 'Số giấy chứng nhận',
    placeholder: 'Nhập số giấy chứng nhận',
  },
  {
    field: 'certificateBookNumber',
    label: 'Số vào sổ cấp GCN',
    placeholder: 'Nhập số vào sổ',
  },
  {
    field: 'issuingAuthority',
    label: 'Cơ quan cấp',
    placeholder: 'Nhập cơ quan cấp',
  },
  {
    field: 'expirationDate',
    label: 'Ngày hết hạn',
    placeholder: 'Chọn ngày hết hạn',
    isDate: true,
  },
  {
    field: 'originOfUsage',
    label: 'Nguồn gốc sử dụng',
    placeholder: 'Nhập nguồn gốc sử dụng',
  },
  {
    field: 'ownershipTerm',
    label: 'Thời hạn sở hữu',
    placeholder: 'Chọn thời hạn',
    isDate: true,
  },
  {
    field: 'notes',
    label: 'Ghi chú',
    placeholder: 'Nhập ghi chú',
  },
  {
    field: 'sharedFacilities',
    label: 'Tiện ích chung',
    placeholder: 'Nhập tiện ích chung',
  },
  {
    field: 'issueDate',
    label: 'Ngày cấp',
    placeholder: 'Chọn ngày cấp',
    isDate: true,
  },
];

export const landFields = [
  {field: 'plotNumber', label: 'Số thửa', placeholder: 'Nhập số thửa'},
  {field: 'mapNumber', label: 'Số tờ bản đồ', placeholder: 'Nhập số tờ bản đồ'},
  {field: 'address', label: 'Địa chỉ', placeholder: 'Nhập địa chỉ'},
  {
    field: 'area',
    label: 'Diện tích (m²)',
    placeholder: 'Nhập diện tích',
    numeric: true,
  },
  {
    field: 'purpose',
    label: 'Mục đích sử dụng',
    placeholder: 'Nhập mục đích sử dụng',
  },
  {
    field: 'expirationDate',
    label: 'Ngày hết hạn',
    placeholder: 'Nhập ngày hết hạn',
    isDate: true,
  },
  {
    field: 'originOfUsage',
    label: 'Nguồn gốc sử dụng',
    placeholder: 'Nhập nguồn gốc sử dụng',
  },
];

export const commonFields = [
  {field: 'title', label: 'Tên tài sản', placeholder: 'Nhập tên tài sản'},
  {
    field: 'proposedValue',
    label: 'Giá trị đề xuất',
    placeholder: 'Nhập giá trị',
    numeric: true,
  },
];

export const ownerInfoFields = [
  {field: 'fullName', label: 'Họ và tên', placeholder: 'Nhập họ và tên'},
  {
    field: 'dayOfBirth',
    label: 'Ngày sinh',
    placeholder: 'Chọn ngày sinh',
    isDate: true,
  },
  {
    field: 'idCardNumber',
    label: 'Số CMND/CCCD',
    placeholder: 'Nhập số CMND/CCCD',
  },
  {
    field: 'permanentAddress',
    label: 'Địa chỉ thường trú',
    placeholder: 'Nhập địa chỉ thường trú',
  },
];

export const vehicleFields = [
  {field: 'model', label: 'Model', placeholder: 'Nhập model xe'},
  {
    field: 'ownerName',
    label: 'Tên chủ sở hữu',
    placeholder: 'Nhập tên chủ sở hữu',
  },
  {field: 'address', label: 'Địa chỉ', placeholder: 'Nhập địa chỉ'},
  {field: 'engineNumber', label: 'Số máy', placeholder: 'Nhập số máy'},
  {field: 'chassisNumber', label: 'Số khung', placeholder: 'Nhập số khung'},
  {field: 'brand', label: 'Hãng xe', placeholder: 'Nhập hãng xe'},
  {field: 'modelNumber', label: 'Số model', placeholder: 'Nhập số model'},
  {field: 'vehicleType', label: 'Loại xe', placeholder: 'Nhập loại xe'},
  {
    field: 'engineCapacity',
    label: 'Dung tích động cơ (cc)',
    placeholder: 'Nhập dung tích',
    numeric: true,
  },
  {field: 'color', label: 'Màu sắc', placeholder: 'Nhập màu sắc'},
  {
    field: 'loadCapacity',
    label: 'Tải trọng (kg)',
    placeholder: 'Nhập tải trọng',
    numeric: true,
  },
  {
    field: 'seatCapacity',
    label: 'Số chỗ ngồi',
    placeholder: 'Nhập số chỗ',
    numeric: true,
  },
  {
    field: 'registrationExpiryDate',
    label: 'Ngày hết hạn đăng ký',
    placeholder: 'Chọn ngày',
    isDate: true,
  },
  {
    field: 'licensePlateNumber',
    label: 'Biển số xe',
    placeholder: 'Nhập biển số',
  },
  {
    field: 'firstRegistrationDate',
    label: 'Ngày đăng ký đầu tiên',
    placeholder: 'Chọn ngày',
    isDate: true,
  },
  {
    field: 'issueDate',
    label: 'Ngày cấp',
    placeholder: 'Chọn ngày',
    isDate: true,
  },
  {
    field: 'registrationCertificateNumber',
    label: 'Số giấy đăng ký',
    placeholder: 'Nhập số giấy đăng ký',
  },
  {field: 'note', label: 'Ghi chú', placeholder: 'Nhập ghi chú'},
  {
    field: 'kilometersDriven',
    label: 'Số km đã đi',
    placeholder: 'Nhập số km',
    numeric: true,
  },
  {
    field: 'inspectionCertificateNumber',
    label: 'Số giấy đăng kiểm',
    placeholder: 'Nhập số đăng kiểm',
  },
];

export const vehicleMetadataFields = [
  {
    field: 'fuelType',
    label: 'Loại nhiên liệu',
    placeholder: 'Nhập loại nhiên liệu',
  },
  {
    field: 'transmission',
    label: 'Hộp số',
    placeholder: 'Nhập loại hộp số',
  },
  {
    field: 'lastService',
    label: 'Lần bảo dưỡng cuối',
    placeholder: 'Chọn ngày',
    isDate: true,
  },
  {
    field: 'warranty',
    label: 'Bảo hành',
    placeholder: 'Nhập thông tin bảo hành',
  },
];

export const apartmentMetadataFields = [
  {
    field: 'parkingSpace',
    label: 'Chỗ đậu xe',
    placeholder: 'Nhập chỗ đậu xe',
  },
  {
    field: 'floor',
    label: 'Tầng',
    placeholder: 'Nhập số tầng',
    numeric: true,
  },
  {
    field: 'view',
    label: 'View',
    placeholder: 'Nhập hướng view',
  },
  {
    field: 'renovationStatus',
    label: 'Tình trạng sửa chữa',
    placeholder: 'Nhập tình trạng',
  },
];

export const landMetadataFields = [
  {
    field: 'zoning',
    label: 'Quy hoạch',
    placeholder: 'Nhập quy hoạch',
  },
  {
    field: 'frontage',
    label: 'Mặt tiền',
    placeholder: 'Nhập kích thước mặt tiền',
  },
  {
    field: 'landUseRights',
    label: 'Quyền sử dụng đất',
    placeholder: 'Nhập quyền sử dụng đất',
  },
  {
    field: 'developmentPotential',
    label: 'Tiềm năng phát triển',
    placeholder: 'Nhập tiềm năng phát triển',
  },
];

export const transferInfoFields = [
  {
    field: 'fullName',
    label: 'Tên chủ cũ',
    placeholder: 'Nhập tên chủ cũ',
  },
  {
    field: 'dayOfBirth',
    label: 'Ngày sinh',
    placeholder: 'Chọn ngày sinh',
    isDate: true,
  },
  {
    field: 'idCardNumber',
    label: 'Số CMND/CCCD',
    placeholder: 'Nhập số CMND/CCCD',
  },
  {
    field: 'permanentAddress',
    label: 'Địa chỉ thường trú',
    placeholder: 'Nhập địa chỉ',
  },
  {
    field: 'transferDate',
    label: 'Ngày chuyển nhượng',
    placeholder: 'Chọn ngày',
    isDate: true,
  },
  {
    field: 'transferRecordNumber',
    label: 'Số hồ sơ chuyển nhượng',
    placeholder: 'Nhập số hồ sơ',
  },
];

export const machineryFields = [
  {field: 'name', label: 'Tên máy móc', placeholder: 'Nhập tên máy móc'},
  {field: 'model', label: 'Model', placeholder: 'Nhập model'},
  {
    field: 'manufacturer',
    label: 'Nhà sản xuất',
    placeholder: 'Nhập nhà sản xuất',
  },
  {
    field: 'manufactureDate',
    label: 'Ngày sản xuất',
    placeholder: 'Chọn ngày sản xuất',
    isDate: true,
  },
  {
    field: 'purchaseDate',
    label: 'Ngày mua',
    placeholder: 'Chọn ngày mua',
    isDate: true,
  },
  {
    field: 'purchasePrice',
    label: 'Giá mua',
    placeholder: 'Nhập giá mua',
    numeric: true,
  },
  {field: 'serialNumber', label: 'Số sê-ri', placeholder: 'Nhập số sê-ri'},
  {field: 'location', label: 'Vị trí', placeholder: 'Nhập vị trí'},
  {field: 'status', label: 'Trạng thái', placeholder: 'Nhập trạng thái'},
  {field: 'note', label: 'Ghi chú', placeholder: 'Nhập ghi chú'},
];

export const machineryMetadataFields = [
  {
    field: 'warranty',
    label: 'Bảo hành',
    placeholder: 'Nhập thời gian bảo hành',
  },
  {
    field: 'maintenanceSchedule',
    label: 'Lịch bảo trì',
    placeholder: 'Nhập lịch bảo trì',
  },
  {
    field: 'powerConsumption',
    label: 'Công suất tiêu thụ',
    placeholder: 'Nhập công suất tiêu thụ',
  },
  {field: 'precision', label: 'Độ chính xác', placeholder: 'Nhập độ chính xác'},
];

export const marketStallFields = [
  {
    field: 'stallName',
    label: 'Tên gian hàng',
    placeholder: 'Nhập tên gian hàng',
  },
  {
    field: 'ownerName',
    label: 'Tên chủ sở hữu',
    placeholder: 'Nhập tên chủ sở hữu',
  },
  {
    field: 'category',
    label: 'Danh mục',
    placeholder: 'Nhập danh mục kinh doanh',
  },
  {
    field: 'areaSize',
    label: 'Diện tích (m²)',
    placeholder: 'Nhập diện tích',
    numeric: true,
  },
  {
    field: 'rentPrice',
    label: 'Giá thuê',
    placeholder: 'Nhập giá thuê',
    numeric: true,
  },
  {
    field: 'rentStartDate',
    label: 'Ngày bắt đầu thuê',
    placeholder: 'Chọn ngày bắt đầu',
    isDate: true,
  },
  {
    field: 'rentEndDate',
    label: 'Ngày kết thúc thuê',
    placeholder: 'Chọn ngày kết thúc',
    isDate: true,
  },
  {field: 'location', label: 'Vị trí', placeholder: 'Nhập vị trí'},
  {
    field: 'contactNumber',
    label: 'Số điện thoại',
    placeholder: 'Nhập số điện thoại',
  },
  {
    field: 'isOccupied',
    label: 'Trạng thái sử dụng',
    placeholder: 'Chọn trạng thái',
    isBoolean: true,
  },
  {field: 'note', label: 'Ghi chú', placeholder: 'Nhập ghi chú'},
];

export const marketStallMetadataFields = [
  {field: 'utilities', label: 'Tiện ích', placeholder: 'Nhập tiện ích'},
  {
    field: 'stallNumber',
    label: 'Số gian hàng',
    placeholder: 'Nhập số gian hàng',
  },
  {
    field: 'refrigeration',
    label: 'Hệ thống làm lạnh',
    placeholder: 'Nhập thông tin',
  },
  {
    field: 'storageSpace',
    label: 'Không gian lưu trữ',
    placeholder: 'Nhập thông tin',
  },
];

export const otherAssetFields = [
  {
    field: 'assetType',
    label: 'Loại tài sản',
    placeholder: 'Nhập loại tài sản',
  },
  {
    field: 'location',
    label: 'Vị trí',
    placeholder: 'Nhập vị trí',
  },
];

export const pieceFields = [
  {
    field: 'name',
    label: 'Tên tác phẩm',
    placeholder: 'Nhập tên tác phẩm',
  },
  {
    field: 'artist',
    label: 'Tên nghệ sĩ',
    placeholder: 'Nhập tên nghệ sĩ',
  },
  {
    field: 'year',
    label: 'Năm sáng tác',
    placeholder: 'Nhập năm sáng tác',
    numeric: true,
  },
  {
    field: 'medium',
    label: 'Chất liệu',
    placeholder: 'Nhập chất liệu',
  },
  {
    field: 'dimensions',
    label: 'Kích thước',
    placeholder: 'Nhập kích thước',
  },
  {
    field: 'value',
    label: 'Giá trị',
    placeholder: 'Nhập giá trị',
    numeric: true,
  },
];

export const insuranceFields = [
  {
    field: 'provider',
    label: 'Nhà cung cấp bảo hiểm',
    placeholder: 'Nhập tên nhà cung cấp',
  },
  {
    field: 'policyNumber',
    label: 'Số hợp đồng bảo hiểm',
    placeholder: 'Nhập số hợp đồng',
  },
  {
    field: 'coverage',
    label: 'Giá trị bảo hiểm',
    placeholder: 'Nhập giá trị bảo hiểm',
    numeric: true,
  },
];

export const storageFields = [
  {
    field: 'location',
    label: 'Địa điểm lưu trữ',
    placeholder: 'Nhập địa điểm lưu trữ',
  },
  {
    field: 'security',
    label: 'Hệ thống bảo mật',
    placeholder: 'Nhập thông tin bảo mật',
  },
];
