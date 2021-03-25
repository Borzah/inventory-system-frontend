import axios from 'axios';

export const loginUserIn = (loginUser) => 
    axios.post('/api/user/login', loginUser)

export const registerUserIn = (registerUser) => 
    axios.post('/api/user/register', registerUser)

export const getCategoriesFromApi = (userId, token) => 
    axios.get(
        `api/categories/user/${userId}`, {
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
    axios.post(`/api/images/${itemId}`, formData, { 
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
    axios.post('/api/categories', category, {headers: {
        'Authorization': `Bearer ${token}`
  }
})

export const getItemFromApi = (itemId, token) => 
    axios.get(`/api/inventory/${itemId}`, { 
        headers: {
                'Authorization': `Bearer ${token}`
        }
    }
)

export const deleteItemWithApi = (itemId, token) =>
    axios.delete(`/api/items/${itemId}`, { 
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

export const addFodlerWithApi = (newFolder, token) =>
    axios.post('/api/folders', newFolder, { 
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)

export const deleteFolderWithApi = (currentFolderId, token) =>
    axios.delete(`/api/folders/${currentFolderId}`, {
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
