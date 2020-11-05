const app = {
    btnGetProducts: $("#products-btn"),
    productsContainer: $('#products-list > tbody'),
    products: [],
    onReady: function () {
        app.renderProducts(app.products);
        app.btnGetProducts.click(app.getProducts);
    },
    getProducts: function () {
        app.renderLoading();
        $.ajax({
            type: "GET",
            url: "https://api.mocki.io/v1/0a9cd191",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
                app.typeFilter(res.data, 'bakery');
                app.renderProducts(app.products);
            },
            failure: function (res) {
                app.isLoading = false;
                alert(res.responseText);
            },
            error: function (res) {
                app.isLoading = false;
                alert(res.responseText);
            }
        })
    },
    renderProducts: function (products) {
        if (products.length) {
            app.productsContainer.empty();
            $.each(products, function (i, item) {
                let rows = `
                            <tr class="product ${item.type === 'fruit' ? ' bg-orange' : null}">
                                <td>${item.title}</td>
                                <td>${item.type}</td>
                                <td>${item.price}</td>
                                <td>${item.rating}</td>
                            </tr>
                        `;
                app.productsContainer.append(rows);
            });
        } else {
            let rows = `
                    <tr class="product message">
                        <td colspan="4">Press the button to get the products.</td>
                    </tr>
                `;
            app.productsContainer.append(rows);
        }
    },
    typeFilter: function (products, type) {
        let typeFilter = products.filter(product => product.type !== type);
        let hash = {};
        const clearRepeats = typeFilter.filter(o => hash[o.title] ? false : hash[o.title] = true);
        app.products = clearRepeats;
    },
    renderLoading: function () {
        app.productsContainer.empty();
        let rows = `
                    <tr class="message">
                        <td colspan="4">
                            <span class="spinner">
                            </span>
                        </td>
                    </tr>
                `;
        app.productsContainer.append(rows);
    }
};

$(document).ready(app.onReady);