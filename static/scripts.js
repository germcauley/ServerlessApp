//API from API gateway
var API_ENDPOINT = "https://vswjooboxk.execute-api.eu-west-1.amazonaws.com/dev"

var PARENT_POST_ID ="none"


function newPost(){

	var inputData = {
		"voice": $('#voiceSelected option:selected').val(),
        "text" : $('#postText').val(),
		"user": $('#username').val(),
		"parentPostID": PARENT_POST_ID
	};

	$.ajax({
	      url: API_ENDPOINT,
	      type: 'POST',
	      data:  JSON.stringify(inputData)  ,
	      contentType: 'application/json; charset=utf-8',
	      success: function (response) {
					document.getElementById("postIDreturned").textContent="Post ID: " + response;
					renderposts();
	      },
	      error: function () {
	          alert("error");
	      }
	  });
}

//Send text to API to create new post
document.getElementById("sayButton").onclick = newPost;


//Get all existing record in DB
// document.getElementById("searchButton").onclick = function(){
window.onload = renderposts();


function renderposts( postId='*'){
    // var postId = $('#postId').val();
	// var postId = "*";
	
	$.ajax({
				url: API_ENDPOINT + '?postId='+postId,
				type: 'GET',
				success: function (response) {

					$('#posts tr').slice(1).remove();

	        jQuery.each(response, function(i,data) {
						console.log('response is '+i);
						var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

						if (typeof data['url'] === "undefined") {
	    				var player = ""
						}

						$("#posts").append("<tr> \
                                <td><button >" + data['id'] + "</button></td> \
                                <td>" + data['user'] + "</td> \
								<td>" + data['voice'] + "</td> \
								<td>" + data['text'] + "</td> \
								<td>" + data['status'] + "</td> \
								<td>" + player + "</td> \
								</tr>");
						

						$("#mycontent").append("<div class='row'>\
								<div class='col-sm-2'>" + data['user'] + "</div>\
								<div class='col-sm-6'>" + data['text'] + "</div>\
								<div class='col-sm-3'>" + player + "</div>\
								<div class='col-sm-1'>\
								<button id='reply' class='idbutt' value='"+ data['id']+"'>Reply</button>\
								</div>\
							  </div>");
	        });
                } 
                ,
				error: function () {
						alert("error");
				}
       		 }).done(function() {
            	var buttons =document.getElementsByClassName('idbutt')
            	for (var i=0; i<buttons.length; i++){
                buttons[i].onclick=function(){
                    var ID = this.value;
				PARENT_POST_ID = ID;
				console.log('setting parent post id to :'+PARENT_POST_ID);
				//pass id into reply function	
				post_reply();
                }
            }
          
          });
        //Run this when a search has been made
    //Get all existing record in DB with same parent ID this will b for the replies page

}


function post_reply(){
	console.log('running reply function '+PARENT_POST_ID);
	console.log('this buttons value is'+PARENT_POST_ID);
	$("#mycontent").empty();
	$("#posts").empty();
	$("#mycontent").append("<label id='parentpostid'>"+PARENT_POST_ID+"</label>");
	// newPost();
	Console.log('NEWPOST!!')
	console.log('afer newpost method'+PARENT_POST_ID);
}


document.getElementById("postText").onkeyup = function(){
	var length = $(postText).val().length;
	document.getElementById("charCounter").textContent="Characters: " + length;
}
