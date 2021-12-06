const button = document.getElementById("start_search")
button.addEventListener("click",()=>{
	input = document.getElementById("ean")
	const ean = input.value.trim()

	let url = `https://world.openfoodfacts.org/api/v0/product/${ean}.json`
	axios.get(url).then(datas=>{

		if (datas.status !== 200){
			alert("La recherche n'a pas aboutie. Veuillez réessayer")
			return
		}
		datas = datas.data

		if(datas.status !== 1){
			input.classList.add("is-invalid")
			alert("Le produit n'a pas été trouvé. Veuillez réessayer")
			return
		}
		product = datas.product

		if( document.getElementById("produit-"+product.id)!==null){
			input.classList.add("is-invalid")
			alert("Le produit est déjà présent.")
			return
		}
		input.classList.remove("is-invalid")

		card = `
					<article id ="produit-${product.id}" class="col-xxl-3 col-lg-4 col-md-6 animate__animated animate__fadeInRight">
				        <div class="card" style="width: 100%; min-width:300px;">
				            <img src="${product.image_url}" class="card-img-top" alt="...">
				            <ul class="list-group list-group-flush">
				                <li class="list-group-item">Marque : ${product.brands}</li>
				                <li class="list-group-item">Nom générique : ${product.generic_name_fr}</li>
				                <li class="list-group-item">Nom français : ${product.product_name_fr}</li>
				                <li class="list-group-item">ean : ${product.id}</li>
				                <li class="list-group-item">Grade : ${product.nutriscore_grade}</li>
				                <li class="list-group-item">Score : ${product.nutriscore_score}</li>
				            </ul>
				            <button id="btn-suppr-${product.id}" class="btn btn-outline-danger">Suppr</button>
				        </div>
				    </article>
	    			`

		section = document.getElementById("list-res")
		section.innerHTML += card //supprime tous ce qui n'est pas dans le HTML, dont les evenements.

		
		articles = section.querySelectorAll("[id^='produit-']")
		console.log(articles)
		articles.forEach(article => {
			setTimeout(()=>{article.classList.remove("animate__animated")}, 500)
			setTimeout(()=>{article.classList.remove("animate__fadeInRight")}, 500)
			console.log(article)
			article.querySelector("[id^='btn-suppr-']").addEventListener("click",()=>{
				article.setAttribute("class","col-xxl-3 col-lg-4 col-md-6 animate__animated animate__fadeOutLeft")
				setTimeout(()=>{ section.removeChild(article) }, 500)
			})
		})
	input.focus()
	input.value = ""
	})
})

