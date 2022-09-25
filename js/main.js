function sort() {
			var geek_list, i, run, li, stop;
			geek_list = document.querySelector(".list-group");
			run = true;
			while (run) {
				run = false;
				li = geek_list.querySelectorAll(".list-group-item");
				
				// Loop traversing through all the list items
				for (i = 0; i < (li.length - 1); i++) {
					stop = false;
					if (li[i].getElementsByTagName("h6")[0].outerText > li[i + 1].getElementsByTagName("h6")[0].outerText) {
						stop = true;
						break;
					}
				}
				if (stop) {
					li[i].parentNode.insertBefore(li[i + 1], li[i]);
					run = true;
				}
			}
		}
        
		if (localStorage.getItem("productListingObject") === null) {
			var Products = {};
			var productListItem = document.querySelectorAll('.list-group-item');
			for (var i = 0; i < productListItem.length; i++) {
				Products[productListItem[i].getElementsByTagName("h5")[0].innerText] = 0;


			}
			localStorage.setItem('productListingObject', JSON.stringify(Products));
		}

        // Add to Cart track based on local storage
		var addCart = document.querySelectorAll('.add-to-cart');

		for (var i = 0; i < addCart.length; i++) {
			addCart[i].addEventListener('click', function(event) {
				var el = this.closest(".media-body");
				var retrievedProductListingObject = localStorage.getItem('productListingObject');
				retrievedProductListingObject = JSON.parse(retrievedProductListingObject);
				var count = retrievedProductListingObject[el.getElementsByTagName("h5")[0].innerText];
				retrievedProductListingObject[el.getElementsByTagName("h5")[0].innerText] = count + 1;

				var li = this.closest(".list-group-item");
				var listProduct = document.querySelectorAll(".list-group-item");
				// if the add to cart clicks more than 5 times then insert in the end
				if (retrievedProductListingObject[el.getElementsByTagName("h5")[0].innerText] > 5) {
					listProduct[addCart.length - 1].parentNode.insertBefore(li, listProduct[addCart.length - 1].nextSibling);
				}
				//console.log(retrievedProductListingObject);
				localStorage.setItem('productListingObject', JSON.stringify(retrievedProductListingObject));
				console.log(retrievedProductListingObject);

				let data = {
					"productTitle": el.getElementsByTagName("h5")[0].innerText,
					"productPrice": el.getElementsByTagName("h6")[0].innerText,
					"addToCartCount": retrievedProductListingObject[el.getElementsByTagName("h5")[0].innerText]
				};
				console.log(data);
				// send post API data
				fetch("https://postman-echo.com/post", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				}).then(res => {
					console.log("Request complete! response:", res);
				});
			});
		}

		window.addEventListener('resize', function(event) {
			if (window.innerWidth < 400) {
				// if user resize less than 400 than sort
				sort();
			}
		})