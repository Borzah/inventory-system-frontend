import axios from 'axios';

export const loginUserIn = (loginUser) => 
    axios.post('/api/user/login', loginUser)

export const registerUserIn = (registerUser) => 
    axios.post('/api/user/register', registerUser)

export const logUserOut = (token) => 
    axios.post('/api/user/logout', {}, { 
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)

export const getUserDataWithCookie = (token) =>
    axios.get('api/user/data', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)

export const getCategoriesFromApi = (token) => 
    axios.get(
        'api/category/all', {
            headers: {
                'Authorization': `Bearer ${token}`
        }
    }
)

export const addOrUpdateItem = (requestMethod, requestString, item, token) => 
    axios({
        method: requestMethod,
        url: requestString,
        data: item,
        headers: {
            'Authorization': `Bearer ${token}`
        }
});

export const addImageToItem = (itemId, formData, token) => 
    axios.post(`/api/image/${itemId}`, formData, { 
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

export const getAllItems = (pathName, token) => 
    axios.get(pathName, { 
        headers: {
        'Authorization': `Bearer ${token}`
    }
})

export const addCategoryToApi = (category, token) =>
    axios.post('/api/category', category, {headers: {
        'Authorization': `Bearer ${token}`
  }
})

export const getItemsByCategory = (token) => 
    axios.get('/api/inventory/user/categories', { 
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)


export const getItemFromApi = (itemId, token) => 
    axios.get(`/api/inventory/${itemId}`, { 
        headers: {
                'Authorization': `Bearer ${token}`
        }
    }
)

export const deleteItemWithApi = (itemId, token) =>
    axios.delete(`/api/item/${itemId}`, { 
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)

export const getItemDtoFromApi = (itemId, token) =>
    axios.get(`/api/item/${itemId}`, { 
        headers: {
                'Authorization': `Bearer ${token}`
        }
    }
)

export const getInventoryContent = (pathString, token) =>
    axios.get(pathString, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)

export const getAllUserFoldersFromApi = (token) => 
    axios.get('/api/folder/all', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)

export const addFodlerWithApi = (newFolder, token) =>
    axios.post('/api/folder', newFolder, { 
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)

export const deleteFolderWithApi = (currentFolderId, token) =>
    axios.delete(`/api/folder/${currentFolderId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)

export const getAdminStatistics = (token) =>
    axios.get("/api/statistics", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)
