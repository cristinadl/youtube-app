var apiKey = "AIzaSyBPJBpEjbDF6RHbUOJTOWXewStlfgV68AI";
var searchTerm;

function builFetch(searchTerm, callback){
	$.ajax({
		url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10";
		method: "GET",
		data: {
			key: apiKey,
			q: searchTerm
		}
		dataType: "json",
        success: responseJson => callback(responseJson),
        error : err => console.log(err)
	})

}

function watchForm(){
	$(".Form").submit((event)=>{
		event.preventDefault();
		
		let wordLookout = $("#SearchBox").val();

		builFetch(wordLookout, displayResults);
	});
}


function displayResults(data) {
	$(".results").html('');

	var ingredient;
	var qty;

	data["drinks"].forEach(function(item){
		let newHTML = `<li class= "drink">
    						<h2> ${item.strDrink} </h2>
    						<img src="${item.strDrinkThumb}" alt= "CocktailImage"/>
    						<ol class>
    						`;
	    	for(i=1; i<15; i++)
	    	{
		    	ingredient = `strIngredient${i}`;
		    	qty = `strMeasure${i}`;
		    	if(item[ingredient] != "")
		    		newHTML +=`<li> ${item[ingredient]} - ${item[qty]}</li>`;
	    	}

		    newHTML += `</ol>  
		    			<h3> Instructions </h3>
		    			<p> ${item.strInstructions} </p> </li>`;

		    $('.results').append(newHTML);
    });
}

$(watchForm);