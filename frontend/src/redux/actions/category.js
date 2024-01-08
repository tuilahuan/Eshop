const server = 'http://localhost:8000/api/v2'; // Replace 'your-backend-url' with your actual backend URL

// Create category
export const createCategory = (categoryData) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${server}/categories/create-category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });
            const data = await response.json();

            dispatch({
                type: "CategoryCreateSuccess",
                payload: data // Có thể điều chỉnh payload tùy theo cấu trúc dữ liệu bạn muốn trả về
            });
        } catch (error) {
            dispatch({
                type: "productCreateFail",
                payload: error.message || 'Failed to create category.'
            });
        }
    };
};

// Get all categories
export const getAllCategories = async () => {
    try {
        const response = await fetch(`${server}/categories/categories`);
        const data = await response.json();
        return data.categories;
    } catch (error) {
        throw error.message || 'Failed to fetch categories.';
    }
};

// Update category by ID
export const updateCategory = async (categoryId, updatedData) => {
    try {
        const response = await fetch(`${server}/categories/update-category/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        const data = await response.json();
        return data.updatedCategory;
    } catch (error) {
        throw error.message || 'Failed to update category.';
    }
};

// Delete category by ID
export const deleteCategory = async (categoryId) => {
    try {
        const response = await fetch(`${server}/categories/delete-category/${categoryId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data.message;
    } catch (error) {
        throw error.message || 'Failed to delete category.';
    }
};
