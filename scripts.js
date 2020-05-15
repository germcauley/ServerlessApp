//API from API gateway
var API_ENDPOINT = "https://vswjooboxk.execute-api.eu-west-1.amazonaws.com/dev"

var PARENT_POST_ID ="none"

//Post to webpage
function newPost(){

	var inputData = {
		"voice": $('#voiceSelected option:selected').val(),
        "text" : $('#postText').val(),
		"user": $('#username').val(),
		"ImageUrl":"https://source.unsplash.com/random",
		"parentPostID": PARENT_POST_ID
	};

	$.ajax({
	      url: API_ENDPOINT,
	      type: 'POST',
	      data:  JSON.stringify(inputData)  ,
	      contentType: 'application/json; charset=utf-8',
	      success: function (response) {
					// document.getElementById("postIDreturned").textContent="Post ID: " + response;
					$("#mycontent").empty();
					$("#posts").empty();
					renderposts();
	      },
	      error: function () {
	          alert("error");
	      }
	  });

	  console.log('POST IS COMPLETED!');
}

//Send text to API to create new post
document.getElementById("sayButton").onclick = newPost;



//Get all existing record in DB
// document.getElementById("searchButton").onclick = function(){
window.onload = renderposts();

//To render all posts, postid should be *
//To render a single post use the id as parmeter
function renderposts( postId='*',parentPostID="none"){
	

	console.log('Running renderpost func id:'+postId+' parentid: '+parentPostID);
	$.ajax({
				url: API_ENDPOINT + '?postId='+postId+'&parentPostID='+parentPostID,
				type: 'GET',
				success: function (response) {
					console.log(response);
					$('#posts tr').slice(1).remove();

	        jQuery.each(response, function(i,data) {
				console.log(response);
				if(data['parentPostID']=='none'){		
						console.log('postid is'+postId);		
						console.log('response is '+i);
						var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

						if (typeof data['url'] === "undefined") {
	    				var player = ""
						}
						// $("#mycontent").append("<div class='row'>\
						// 		<div id='UserImage' class='col-sm-3'><img src="+ data['ImageUrl']+" alt=''></div>\
						// 		<div class='col-sm-9'>" + data['text'] + "</div>\
						// 	  </div>\
						// 	  <div class='row'>\
						// 	  	<div class='col-sm-3'>" + data['user'] + "</div>\
						// 		 <div class='col-sm-7'>" + player + "</div>\
						// 		 <div class='col-sm-2 btn btn-light' id ='REPLYBTN'><button id='reply' class='idbutt ' value='"+ data['id']+"'>Reply</button></div>\
						// 	  </div>");

						 $("#mycontent").append("<div class='card'>\
								<div class='card-header'>"+ data['user'] + "\
									</div>\
									<div class='card-body'>\
										<div class =row>\
										<div class='col-sm-3'><img src="+ data['ImageUrl']+" alt=''></div>\
										<div class='col-sm-9'><p class='card-text'>" + data['text'] + "</p></div>\
										</div>\
										<div class =row>\
										<div class='col-sm-3' id ='REPLYBTN'><button id='reply' class='idbutt btn btn-primary ' value='"+ data['id']+"'>Reply</button></div>\
										<div class='col-sm-7'>" + player + "</div>\
										<div class='col-sm-2'>\
										</div>\
									</div>\
								</div>");
						
				}
	        });
                } 
                ,
				error: function () {
						alert("error");
				}//Below add onclick event to newly rendered posts
       		 }).done(function() {
            	var buttons =document.getElementsByClassName('idbutt')
            	for (var i=0; i<buttons.length; i++){
                buttons[i].onclick=function(){
						var ID = this.value;
					PARENT_POST_ID = ID;
					//pass id into reply function	
					reply();
                }
            }         
          });
}

//when user clicks reply, render parent post and children posts
function reply(){

	console.log('displaying post and replies for post with id' + PARENT_POST_ID)
	renderposts(PARENT_POST_ID);
	$("#mycontent").empty();
	$("#posts").empty();
	renderreply(PARENT_POST_ID,PARENT_POST_ID);
	$("#REPLYBTN").empty();
	console.log('posted reply to '+PARENT_POST_ID);
	document.getElementById("REPLYBTN").style.visibility = "hidden";

}
	
//make ajax Request for replies
//To render replies postid should be != * and  parentpostiD should!= none
function renderreply( postId='*',parentPostID='none'){
    

	
	console.log('Running renderreply '+postId);
	$.ajax({
				url: API_ENDPOINT + '?postId='+postId,
				type: 'GET',
				success: function (response) {

					$('#posts tr').slice(1).remove();

	        jQuery.each(response, function(i,data) {

				if(data['parentPostID']==PARENT_POST_ID){		
						console.log('postid is'+postId);		
						console.log('response is '+i);
						var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

						if (typeof data['url'] === "undefined") {
	    				var player = ""
						}
						$("#myreplies").append("<div class='row'>\
								<div class='col-sm-2'>" + data['user'] + "</div>\
								<div class='col-sm-6'>" + data['text'] + "</div>\
								<div class='col-sm-3'>" + player + "</div>\
							  </div>");
				}
	        });
                } 
                ,
				error: function () {
						alert("error");
				}//Below add onclick event to newly rendered posts
       		 })
}

	// make ajax request

document.getElementById("postText").onkeyup = function(){
	var length = $(postText).val().length;
	document.getElementById("charCounter").textContent="Characters: " + length;
}




