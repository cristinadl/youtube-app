let apiKey = "AIzaSyBPJBpEjbDF6RHbUOJTOWXewStlfgV68AI";
var searchTerm = "";
var next = "";
var prev = "";

function buildFetch(searchTerm, callback){
	console.log("entro buildFetch");
	$.ajax({
		url: "https://www.googleapis.com/youtube/v3/search",
		method: "GET",
		data: {
			key: apiKey,
			q: searchTerm,
			maxResults: 10,
			part: "snippet",
			type: "video"
		},
		dataType: "json",
        success: responseJson => callback(responseJson),
        error : err => console.log(err)
	})

}

function buildFetchMore(page, callback){
	$.ajax({
		url: "https://www.googleapis.com/youtube/v3/search",
		method: "GET",
		data: {
			key: apiKey,
			q: searchTerm,
			maxResults: 10,
			part: "snippet",
			type: "video",
			pageToken: page
		},
		dataType: "json",
        success: responseJson => callback(responseJson),
        error : err => console.log(err)
	})
}

function watchForm(){
	$(".Form").submit((event)=>{
		event.preventDefault();
		searchTerm = $("#SearchBox").val();
		buildFetch(searchTerm, displayResults);
	});
}


function displayResults(data) {
	let newHTML = "<ul>";
	console.log("entro dataresults");
	console.log(data);
	$(".results").html('');
	data["items"].forEach(function(item){
		newHTML += `
						<li class= "video">
	    						<a  target="_blank" href="https://www.youtube.com/watch?v=${item.id.videoId}">
	    							<h2> ${item.snippet.title} </h2>
	    							<img src="${item.snippet.thumbnails.default.url}" alt= "Video Image"/>
	    						</a>
	    					</li>
	    			`;
    });

    newHTML += "</ul>";

    if(data.prevPageToken) {
    	newHTML += `<div>
    					<button class= "BTN" id= "prevBTN" type="button">
    						Previous
    					</button>
    					<button class= "BTN" id= "nextBTN" type="button">
    						Next
    					</button>
    				</div>`
    	prev = data.prevPageToken;
    	next = data.nextPageToken;
    }
    else{
    	newHTML += `<div>
    					<button class= "BTN" id= "nextBTN" type="button">
    						Next
    					</button>
    				</div>`
    				next = data.nextPageToken;
    }

    $('.results').append(newHTML);
}

$('.results').on("click", "#nextBTN", function(event){
	buildFetchMore(next, displayResults);
})

$('.results').on("click", "#prevBTN", function(event){
	buildFetchMore(prev, displayResults);
})


$(watchForm);