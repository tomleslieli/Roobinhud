export const showStock = ticker => (
    $.ajax({
        url: '/api/stock',
        method: 'GET',
        data: {ticker}
    })
);

export const purchaseStock = stock => (
    $.ajax({
        url: '/api/users',
        method: 'POST',
        data: {user}
    })
);

export const removeStock = data => (
    $.ajax({
        // url: '/api/session',
        method: 'PATCH',
        data: {data}
    })
);