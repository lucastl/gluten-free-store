const app = {
    btnGetProducts: $("#products-btn"),
    productsList: $('#products-list > tbody'),
    onReady: function () {
        app.btnGetProducts.click(app.getProducts);
    },
    getProducts: function () {
        $.ajax({
            type: "GET",
            url: "https://api.mocki.io/v1/0a9cd191",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                let products = data.data;
                let typeFilter = products.filter(product => product.type !== 'bakery');
                let hash = {};
                const filteredProducts = typeFilter.filter(o => hash[o.title] ? false : hash[o.title] = true);
                app.renderProducts(filteredProducts);
            },
            failure: function (data) {
                alert(data.responseText);
            },
            error: function (data) {
                alert(data.responseText);
            }
        })
    },
    renderProducts: function (products) {
        app.productsList.empty();
        $.each(products, function (i, item) {
            var rows = `
                <tr class="product ${item.type === 'fruit' ? ' bg-orange' : null}">
                    <td>${item.title}</td>
                    <td>${item.type}</td>
                    <td>${item.price}</td>
                    <td>${item.rating}</td>
                </tr>
            `;
            app.productsList.append(rows);
        });
    }
};

$(document).ready(app.onReady);