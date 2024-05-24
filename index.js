document.addEventListener('DOMContentLoaded', () => {
    async function getHighestPricedProduct() {
        const url = 'https://svc-0-staging-usf.hotyon.com/search?q=&apiKey=1fedccb4-262f-4e65-ae6d-d01e8024fe83';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const datas = await response.json();
            // console.log(data)
            
            data = datas.data;
            items = data.items;
        
            let highestPrice = 0;
            let HighestPricedProduct = null;

            // Lặp qua từng sản phẩm để tìm sản phẩm có giá cao nhất
            items.forEach(item => {
                item.variants.forEach(variant => {
                    const price = variant.price;
                    if (price > highestPrice) {
                        highestPrice = price;
                        HighestPricedProduct = {
                            ID : item.id,
                            name: item.title,
                            price: `$${price} USD`,
                            options: item.options.map(option => ({
                                name: option.name,
                                value: variant[option.name.toLowerCase()] 
                            }))
                        };
                    }
                });
                console.log(HighestPricedProduct)
            });

            if (HighestPricedProduct) {
                const productInfoDiv = document.getElementById('product-info');
                productInfoDiv.innerHTML = `
                    <h2>${HighestPricedProduct.name}</h2>
                    <p>Price: ${HighestPricedProduct.price}</p>
                    <h3>Options:</h3>
                `;
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    getHighestPricedProduct();
});