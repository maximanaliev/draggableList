import {
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_ITEMS_ERROR,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    SEND_ITEM_ERROR
} from "../actions/actions";

const initialState = {
    items: null,
    itemsLoading: false,
    itemsError: null,
    item: null,
    itemLoading: false,
    itemError: null,
    categories: null,
    categoriesLoading: false,
    categoriesError: null,
    sendItemError: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST:
            return {...state, itemsLoading: true};
        case GET_ITEMS_SUCCESS:
            return {...state, items: action.data, itemsLoading: false, itemsError: null};
        case GET_ITEMS_ERROR:
            return {...state, itemsLoading: false, itemsError: action.error};
        case GET_CATEGORIES_REQUEST:
            return {...state, categoriesLoading: true};
        case GET_CATEGORIES_SUCCESS:
            return {...state, categories: action.data, categoriesLoading: false, categoriesError: null};
        case GET_CATEGORIES_ERROR:
            return {...state, categoriesLoading: false, categoriesError: action.error};
        case SEND_ITEM_ERROR:
            return {...state, sendItemError: action.error};
        default:
            return state;
    }
};

export default reducer;