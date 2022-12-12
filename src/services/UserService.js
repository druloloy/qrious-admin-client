import ApiService from './ApiService';
const getAllFileMetadata = () => {
    return ApiService.get('file/metadata/all', {
        headers: {
            'Accept-Encoding': 'gzip, deflate, br'
        }
    });
}

const uploadDocument = async (data, controller) => {
    // with cancel token
    return await ApiService.post('file/upload', data, {
        signal: controller.signal,
        headers: {
            'Content-Type': 'multipart/form-data',
            // compression
            'Content-Encoding': 'gzip, deflate',
            'Accept-Encoding': 'gzip, deflate'
        }
    });
}

const UserService = {
    getAllFileMetadata,
    uploadDocument
}

export default UserService;