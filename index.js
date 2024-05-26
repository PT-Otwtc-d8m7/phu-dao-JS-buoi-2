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

            let totalPrice = 0;
            let count = 0;

            items.forEach(item => {
                if(item.title === "Test bundle") {
                    item.variants.forEach(variant => {
                        const price = variant.price
                        totalPrice = totalPrice + price;
                        count++;
                    });
                }
            });

            console.log(`Total Price: ${totalPrice}`);
            console.log(`Count: ${count}`);

            if (HighestPricedProduct) {
                const productInfoDiv = document.getElementById('product-info');
                productInfoDiv.innerHTML = `
                    <h2>${HighestPricedProduct.name}</h2>   
                    <p>Price: ${HighestPricedProduct.price}</p>
                    <h3>Options:</h3>
                `;
            }
            
            if (totalPrice !== 0 && count !== 0) {
                const productInfoDiv = document.getElementById('testbundle-info');
                productInfoDiv.innerHTML = `
                    <h2>Test bundle</h2>   
                    <p>Total Price: ${totalPrice}</p>
                    <h3>Count: ${count}</h3>
                `;
            }


            let resultsHTML = '';

            items.forEach(item => {
                item.variants.forEach(variant => {
                    if (variant.available === 0) {
                        resultsHTML += `<p>/=/</p>`;
                        resultsHTML += `<p>${item.title}</p>`;
                        resultsHTML += `<p>Price: ${variant.price}</p>`;
                    }
                });
            });

            const resultsDiv = document.getElementById('soldout-info');
            resultsDiv.innerHTML = resultsHTML;
            

            items.forEach(item => {
                item.variants.forEach(variant => {
                    const available = variant.available;
                    if (available === 0) {
                        console.log(item.title)
                        console.log(variant)
                    }
                });
            });
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    getHighestPricedProduct();
});