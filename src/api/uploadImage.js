import axiosInstance from './axiosInstance';

export const uploadImage = async file => {
  try {
    if (!file || !file.fileName) {
      throw new Error('File không hợp lệ');
    }

    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });

    console.log('Upload image formData:', formData);

    const response = await axiosInstance.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000, // 30s timeout
    });

    console.log('Upload image response:', response.data.result.url);

    if (!response.data || !response.data.result) {
      throw new Error('Không nhận được đường dẫn ảnh từ server');
    }

    return response.data.result;
  } catch (error) {
    console.log('Upload image error:', error);
    if (error.response) {
      // Lỗi từ server
      switch (error.response.status) {
        case 413:
          throw new Error('Kích thước file quá lớn');
        case 415:
          throw new Error('Định dạng file không được hỗ trợ');
        default:
          throw new Error(
            `Lỗi upload: ${error.response.data?.message || 'Vui lòng thử lại'}`,
          );
      }
    } else if (error.request) {
      // Lỗi không có response
      console.log('Không thể kết nối đến server');
    } else {
      // Lỗi khác
      console.log(error.message || 'Có lỗi xảy ra khi upload ảnh');
    }
  }
};
