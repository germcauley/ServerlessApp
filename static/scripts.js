//API from API gateway
var API_ENDPOINT = "https://vswjooboxk.execute-api.eu-west-1.amazonaws.com/dev"

//Send text to API to create new post
document.getElementById("sayButton").onclick = function(){

	var inputData = {
		"voice": $('#voiceSelected option:selected').val(),
        "text" : $('#postText').val(),
        "user": $('#username').val()
	};

	$.ajax({
	      url: API_ENDPOINT,
	      type: 'POST',
	      data:  JSON.stringify(inputData)  ,
	      contentType: 'application/json; charset=utf-8',
	      success: function (response) {
					document.getElementById("postIDreturned").textContent="Post ID: " + response;
	      },
	      error: function () {
	          alert("error");
	      }
	  });
}



//Get all existing record in DB
// document.getElementById("searchButton").onclick = function(){
window.onload = function(){
    // var postId = $('#postId').val();
    var postId = "*";


	$.ajax({
				url: API_ENDPOINT + '?postId='+postId,
				type: 'GET',
				success: function (response) {

					$('#posts tr').slice(1).remove();

	        jQuery.each(response, function(i,data) {

						var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

						if (typeof data['url'] === "undefined") {
	    				var player = ""
						}

						$("#posts").append("<tr> \
                                <td><button class='idbutt'>" + data['id'] + "</button></td> \
                                <td>" + data['user'] + "</td> \
								<td>" + data['voice'] + "</td> \
								<td>" + data['text'] + "</td> \
								<td>" + data['status'] + "</td> \
								<td>" + player + "</td> \
								</tr>");
						

						$("#mycontent").append("<div class='row'>\
								<div class='col-sm-3'>" + data['user'] + "</div>\
								<div class='col-sm-6'>" + data['text'] + "</div>\
								<div class='col-sm-3'>" + player + "</div>\
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
                    var ID = this.textContent;
                alert("just clicke button "+ID);
                }
            }
          
          });
        //Run this when a search has been made
    //Get all existing record in DB with same parent ID this will b for the replies page
   
}


// var reply = document.getElementById("idbutt")

//     reply.onclick=function() {  

//         var ID = this.text(); 
//         alert("just clicked: "+ID); 

//   };

// $(document).ready(function(){
//     $("#idbutt").click(function(){
//         console.log('clicked the button!!');
//         var ID = this.text(); 
//         alert("just clicked: "+ID); 
//     });
//   });

    

document.getElementById("postText").onkeyup = function(){
	var length = $(postText).val().length;
	document.getElementById("charCounter").textContent="Characters: " + length;
}
