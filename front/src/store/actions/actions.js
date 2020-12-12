import axiosApi from "../../axiosApi";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR';

export const SEND_ITEM_ERROR = 'SEND_POST_ERROR';

export const getItemsRequest = () => ({type: GET_ITEMS_REQUEST});
export const getItemsSuccess = data => ({type: GET_ITEMS_SUCCESS, data});
export const getItemsError = error => ({type: GET_ITEMS_ERROR, error});

export const getCategoriesRequest = () => ({type: GET_CATEGORIES_REQUEST});
export const getCategoriesSuccess = data => ({type: GET_CATEGORIES_SUCCESS, data});
export const getCategoriesError = error => ({type: GET_CATEGORIES_ERROR, error});

export const sendItemError = error => ({type: SEND_ITEM_ERROR, error});

export const getItems = categoryId => {
    return async (dispatch) => {
        try {
            let url = '/goods';
            if (categoryId) {
                url += `?category=${categoryId}`
            }
            dispatch(getItemsRequest());
            const response = await axiosApi.get(url);
            dispatch(getItemsSuccess(response.data));
        } catch (error) {
            dispatch(getItemsError(error));
        }
    };
};

export const getCategories = () => {
    return async (dispatch) => {
        try {
            dispatch(getCategoriesRequest());
            const response = await axiosApi.get('/categories');
            dispatch(getCategoriesSuccess(response.data));
        } catch (error) {
            dispatch(getCategoriesError(error));
        }
    };
};

export const addItem = (itemData, params) => {
    return async (dispatch) => {
        try {
            await axiosApi.post('/goods', itemData);
            dispatch(getItems(params));
        } catch (error) {
            if (error.response) {
                dispatch(sendItemError(error.response.data));
            } else {
                dispatch(sendItemError({global: 'Network error or no internet'}));
            }
        }
    };
};

export const deleteItem = (id, params) => {
    return async (dispatch) => {
        try {
            await axiosApi.delete(`/goods/${id}`);
            dispatch(getItems(params));
        } catch (error) {
            console.error(error)
        }
    };
};