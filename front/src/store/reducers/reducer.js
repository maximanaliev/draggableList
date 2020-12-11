const initialState = {
    categories: [{name: "Красный"}, {name: "Синий"}, {name: "Зеленый"}],
    items: [
        {
            name: "Очень красивая лампа",
            price: 1100,
            quantity: 5,
            category: "Красный",
        },
        {
            name: "Люстра шикос!",
            price: 1200,
            quantity: 2,
            category: "Синий",
        },
        {
            name: "А это как тарелка перевернутая",
            price: 700,
            quantity: 1,
            category: "Синий",
        }
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;