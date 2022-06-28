export const fetchStock = stockId => (
    $.ajax({
        url: `/api/stocks/${stockId}`,
        method: 'GET',
    })
);

export const createStock = stock => (
    $.ajax({
        url: '/api/stocks',
        method: 'POST',
        data: {stock}
    })
);

export const updateStock = stock => (
    $.ajax({
        url: `/api/stocks/${stock.id}`,
        method: 'PATCH',
        data: {stock}
    })
);