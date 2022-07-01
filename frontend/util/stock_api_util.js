export const fetchStock = stockId => {
    // console.log('WE ARE IN FETCHSTOCK', stockId)
    jQuery.ajax({
        url: `/api/stocks/${stockId}`,
        method: 'GET',
    })
};

export const createStock = (stock, xValues, yValues) => (
    // console.log('IN STOCK API UTIL', stock)
    $.ajax({
        url: '/api/stocks',
        method: 'POST',
        data: {
            stock: stock,
            x_values: xValues,
            y_values: yValues
        }
    })
);

export const updateStock = stock => (
    $.ajax({
        url: `/api/stocks/${stock.id}`,
        method: 'PATCH',
        data: {stock}
    })
);