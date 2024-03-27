//PULL DATA HERE
var ws = new WebSocket("ws://ipaddress::port");

class Teacher{
	constructor(){
		this.isAdmin = false;
		this.accessCode = null;
		this.myStudents = null;
		this.correctAnswer = null;
	};				
};
winner = {
    first_name: "",
    last_name: "",
    //accessCode: "",
    score: -5
};
var myTimeOut;
admin = new Teacher();


function destroyer()
{
	$("body").remove();
}

function askUserInputs()
{
	var inputHTMLForm=  //'<form>'+
		'<div id="getInput">'+
		
      '<p><input id="admin" class="w3-input w3-padding-16 w3-border" type="password" placeholder="Admin Code" required name="Admin"></p>'+ 
      '<p><input id="aCode" class="w3-input w3-padding-16 w3-border" type="text" placeholder="Access Code" required name="accessCode"></p>'+
      '<p><button onClick="checkAndAddCode()">SUBMIT</button></p>' +
    '</div>';
    //'</form>';
	$(".addForm").append(inputHTMLForm);
	//myTimeOut = setTimeout(destroyer,300000);
	window.myVar = 10058;
}

askUserInputs();
var removeElement = false;
function checkAndAddCode()
{
	if(document.getElementById("accessCodeError") != null)
	{
		$("#accessCodeError").remove();
	}
	var adminCode = $("#admin").val();
	//console.log(adminCode);
	var accessCode = $("#aCode").val();
	if(accessCode <0 || accessCode > 5000 )
	{

		var addMessage = '<p id="accessCodeError"> Please enter a value between 0 and 50000 for access code. </p>';
		$("#getInput").append(addMessage);
		return;
	}
	if(adminCode==="ECE528")
		{
			if(removeElement)
				$("#redItem").remove();
			admin['accessCode']= accessCode;
			
			

			addStudents();
		}
	else{
		if(!removeElement){
			var addElement = '<p id="redItem"> *The Admin Code is not found </p>'
			$("#admin").before(addElement)
		}
			removeElement = true;
		}
}

function addStudents()
{
	$("#getInput").remove();
	var directory = '<p id="directory"> <a style="font-size: 30px">Upload student images:  </a><input  type="file" id="file" style="font-size: 20px"  webkitdirectory mozdirectory> </p>';
	var addButton = '<p id="addButton"> <button onClick="getFileData()">Submit</button> </p>';
	$(".addForm").append(directory);
	reentry = false;
	$("#directory").change(function ()
	{
		var count = 0;
		var fileList1 = $("#file")[0].files;
		if(fileList1.length >0)
		{
		console.log("here");
			for(i=0;i <fileList1.length;i++)
				{
					var fileName = fileList1[i].name;
					var h = "hello WORDL";
					//console.log(fileName.substring(3,6));
					var trimmedName = fileName.substring(fileName.length-5,fileName.length);
					var trimmedNameAgain = trimmedName.substring(1,trimmedName.length);
					//console.log(trimmedName);
					//console.log(trimmedNameAgain);
					if(trimmedNameAgain == ".png" || trimmedNameAgain == ".jpg" || trimmedName ==".jpeg")
					{
						count++;
						console.log(fileName);
						console.log("This is an image");
					}
					else{
						console.log(fileName);
						console.log("This is not an image");
					}
				}

			
			if(count > 0)
			{
				if(reentry == true)
				{
					$("#numImages").remove();
				}
				$(".addForm").append(addButton);
				var addLabel = '<p id="numImages" style="color:yellow; font-size: 25px;font-weight:bold"> Of the ' + String(fileList1.length) + ' files you uploaded, ' 
				+ String(count) + ' Images are being uploaded. </p>';
				console.log(addLabel);
				$("#addButton").append(addLabel);
			}
			else
			{
				if(reentry == true)
				{
					$("#numImages").remove();
				}
				var addLabel = '<p id="numImages" style="color:yellow; font-size: 25px;font-weight:bold"> Files must be of the following image format: .PNG, .JPEG, .JPG </p>';
				$(".addForm").append(addLabel);
				reentry = true;
			}
			}
	});
	
	myTimeOut = setTimeout(reloads,300000);
}

imageBase64 = new Array();
function getFileData()
{
	clearTimeout(myTimeOut);
	//const ws = new WebSocket("ws://ipaddress:port");
	accessCodeArr = ["ADD NEW ADMIN", admin.accessCode];
	console.log("Sent access Code over");
	ws.send(accessCodeArr);
	
	var fileList1 = $("#file")[0].files;
	$("#directory").remove();
	$("#addButton").remove();
	console.log(fileList1.length);
	var newArray = new Array();
	if(fileList1.length >0)
		{
		console.log("here");
			for(i=0;i <fileList1.length;i++)
				{
					var fileName = fileList1[i].name;
					var h = "hello WORDL";
					//console.log(fileName.substring(3,6));
					var trimmedName = fileName.substring(fileName.length-5,fileName.length);
					var trimmedNameAgain = trimmedName.substring(1,trimmedName.length);
					console.log(trimmedName);
					console.log(trimmedNameAgain);
					if(trimmedNameAgain == ".png" || trimmedNameAgain == ".jpg" || trimmedName ==".jpeg")
					{
						
						if(fileName.includes("_"))
						{
							var fullName = fileList1[i].name.split('_');
						}
						else if(fileName.includes(" "))
						{
							var fullName = fileList1[i].name.split(' ');
						}
						else
						{
							console.log("Incorrect File format.");
							var fullName = ["Generic", "Name" + trimmedName ];
						}
						console.log(fileList1[i]);
						var myimg = URL.createObjectURL(fileList1[i]);
						var reader = new FileReader();
						reader.onload = imageIsLoaded;
						//last_file = this.files[0];
						reader.readAsDataURL(fileList1[i]);
						
						
	
						console.log(i);
	
						newArray.push({"first_name" : fullName[0],
							 "last_name" : fullName[1].split('.')[0],
							 "img" : imageBase64[i],
							 "isDisplayed" : false,
							});
					}
					else
					{

					}
					
					/*reader = new FileReader();
					reader
					reader.readAsDataURL(fileList1[i]);*/
					/*let blob =  await fetch(myimg).then(r => r.blob());
					console.log(blob);
					const reader = new FileReader();
					reader.readAsDataURL(blob);
					
					reader.onloadend = function () {
						var base64String = reader.result;
						console.log('Base64 String - ', base64String);
					  
						// Simply Print the Base64 Encoded String,
						// without additional data: Attributes.
						console.log('Base64 String without Tags- ', 
					   base64String.substr(base64String.indexOf(', ') + 1));
							}*/
					//myimg = previewFile(fileList1[i]);
					/*encoded = "";
					blobToBase64(myimg).then(res =>
						{
							encoded = res;
						});
					image = encoded;*/
					//myimg.replace("blob:null/","data:image");
					
					
					
				}
			myObject = JSON.stringify(newArray);
			admin.myStudents =JSON.parse(myObject);
			//console.log(imageBase64[0]);
			console.log(admin.myStudents);
			//You got to loop through to check items
		}
		
	/*var imgNum = getRndInteger(0,admin.myStudents.length);
	admin.myStudents[imgNum].isDisplayed = true;
	var imageHTML = '<img id="currentImg" src='+admin.myStudents[imgNum].img+' height="400" width="400" />';
					$(".addForm").append(imageHTML);
	var addName1 = '<p id="addName" style="font-size: 30px">' + admin.myStudents[imgNum].first_name+' '+admin.myStudents[imgNum].last_name+'</p>';
					$("#labelName").append(addName1);*/
	var nextButton = '<p id="nextButton" style="padding-top:50px; margin:right"> <button onClick="displayNextImg()">Start</button> </p>'
					$("#next").append(nextButton);
					$(".buttonRightGradient").remove();
					var addAccessCode = '<p style="font-size: 45px; left: 5%"> <img src="star.png" width="40" height="40" alt="Access Code Picture">'+
					'Access Code: '       + admin.accessCode+
						'</p>';
					$("#accessCode").append(addAccessCode);
	console.log(newArray);
	myTimeOut = setTimeout(reloads,300000);
}
var countImgs = 0;
enterGameOver = false;
function reloads()
{
	//console.log("Refresh");

	location.reload();
}

function displayNextImg()
{

	clearTimeout(myTimeOut);
	
	myTimeOut = setTimeout(reloads,300000);
	if(countImgs!=0){
		$("#myTable").remove();
		console.log("ContImg not zero");
	}
	else
	{
		for(i=0;i<imageBase64.length;i++)
		{
			admin.myStudents[i].img =imageBase64[i];
		console.log(i);
		//console.log(imageBase64[i]);
		}
		var trackStudents = '<header>header area</header>'+
		'<nav id="navScore" style="border:4px solid rgb(5, 3, 138);font-family:arial;font-size: 25px;height:258px;width:500px;">'+
		'<ul id="scoreTracker" style="list-style:none;border: 2px solid rgb(40,40,40);max-height:250px;max-width: 500px;margin:0; overflow:auto;padding:0;text-indent:5px;">'+
		'</ul></nav>'+
		'<footer>footer area</footer> ';
		$("#listScores").append(trackStudents);

	}
	ws.send("Update Scores");
	$("#nextButton").remove();
	
	var nextButton = '<p id="nextButton" style="padding-top:50px; margin:right"> <button onClick="calculateScore()">Next</button> </p>'
					$("#next").append(nextButton);	
	while(true){
	var imgNum = getRndInteger(0,admin.myStudents.length);
		if(admin.myStudents[imgNum].isDisplayed==false)
			break;
	}
	admin.myStudents[imgNum].isDisplayed=true;
	$("#currentImg").remove();
	$("#addName").remove();
	
	
	var imageHTML = '<img id="currentImg" src='+admin.myStudents[imgNum].img+' height="400" width="400" />';
					$(".addForm").append(imageHTML);
	/*var addName1 = '<p id="addName" style="font-size: 30px">' + admin.myStudents[imgNum].first_name+' '+admin.myStudents[imgNum].last_name+'</p>';
					$("#labelName").append(addName1);*/
	admin.correctAnswer = imgNum;
	console.log(imgNum);
	console.log(admin.myStudents[imgNum].first_name);
	var choices = [imgNum];
	ensureArrayIsDifferent(choices);
	console.log(choices);
	myArr = shuffle(choices);
	console.log(myArr);
	
	/*
	var tableHtml ='<table id="myTable" style="width:100%; white-space: nowrap">'+
  '<tr >'+
 ' <td class="leftTable"> '+
			'<div class="yellow customcb">'+
  			'<input type="checkbox" value="1" id="customcb1" name="customcb[1]" />'+
  			'<label class="inner" for="customcb1"></label>'+
 			'<a3 id="topLeftTableLabel" style="font-size: 30px; "><label class="outer" for="customcb1" id="customcb1_text" >'+
		admin.myStudents[myArr[0]].first_name+' '+admin.myStudents[myArr[0]].last_name+
		'</label></a3>'+
		'</div>'+
	'</td>'+
    '<td class="rightTable">'+
	 '<div class="yellow customcb">'+
  			'<input type="checkbox" value="1" id="customcb2" name="customcb[2]" />'+
  			'<label class="inner" for="customcb2"></label>'+
 			'<a3 id="topRightTableLabel" style="font-size: 30px; "><label class="outer" for="customcb2" id="customcb2_text" >'+
		admin.myStudents[myArr[1]].first_name+' '+admin.myStudents[myArr[1]].last_name+'</label></a3>'+
		'</div> '+
	  
	 '</td>'+
  '</tr>'+
  '<tr>'+
    '<td style="padding-top: 100px "> '+
			'<div class="yellow customcb">'+
  			'<input type="checkbox" value="1" id="customcb3" name="customcb[3]" />'+
  			'<label class="inner" for="customcb3"></label>'+
 			'<a3 id="bottomLeftTableRight" style="font-size: 30px; "> <label class="outer" for="customcb3" id="customcb3_text" >'+
		admin.myStudents[myArr[2]].first_name+' '+admin.myStudents[myArr[2]].last_name+'</label></a3>'+
		'</div>'+
	'</td>'+
    '<td class="rightTable" style="padding-top: 100px ">'+
	 '<div class="yellow customcb">'+
  			'<input type="checkbox" value="1" id="customcb4" name="customcb[4]" />'+
  			'<label class="inner" for="customcb4"></label>'+
 			'<a3 id="bottomRightTableLabel" style="font-size: 30px; "><label class="outer" for="customcb4" id="customcb4_text" >'+admin.myStudents[myArr[3]].first_name+' '+admin.myStudents[myArr[3]].last_name+'</label> </a3>'+
		'</div>  '+
	 '</td>'+
 ' </tr>'+

'</table>';
	

	
	$("#nextButton").before(tableHtml);*/
	var sendArray = new Array();
	ws.addEventListener("message", e =>
	{
    console.log("E Data is " + e.data);
		//console.log(e.data.length);
		
		if(e.data.includes(","))
		{
			myData = JSON.parse(e.data);
			//myData = e.data.split(',');
			console.log("Received Data");
			console.log(myData);
			if(myData[0]=="Winner" && enterGameOver == false)
			{
				enterGameOver = true;
				winner["first_name"] = myData[1]["first_name"];
                winner["last_name"]= myData[1]["last_name"];
                winner["score"] = myData[1]["score"];
				console.log(winner);
				var gameOverString = '<p style="font-size: 80px; font-weight:bold; color: yellow"> Game Over</p>'+
	 			'<p style="font-size: 50px"> Winner is: '+ winner["first_name"] + ' ' + winner["last_name"] + '</p>' +
				'<p style="font-size: 50px"> With a Score of: <a1 style="color:yellow">' + winner["score"]+ '           </a1></p>';
				$(".w3-display-middle").append(gameOverString);
				$("#getResults").remove();
				$("#GameOver").remove();

			}
			else
			{
				$("#scoreTracker").remove();

				scoreTrack = '<ul id="scoreTracker" style="list-style:none;border: 2px solid rgb(40,40,40);max-height:250px;max-width: 500px;margin:0; overflow:auto;padding:0;text-indent:5px;">'+'</ul></nav>';
				$('#navScore').append(scoreTrack);
				myData = JSON.parse(e.data);
				console.log("My data.length is" + String(myData.length));
				console.log(myData);
				for(i=0;i<myData.length;i++)
				{
					console.log("herre but wont append");
					appendScoresTable = '<li>'+ myData[i].first_name+' '+myData[i].last_name+
					'<span style="color:yellow; padding-left: 150px;">' + myData[i].score+ '</span></li>';
					$("#scoreTracker").append(appendScoresTable);
				}
				
			}
		}
		
	}
	);
	ws.addEventListener("open", () =>
	{
		console.log("We are connected");
	}
	);
	
		for(i=0;i<4;i++)
		{
			if(myArr[i]==admin.correctAnswer)
			{
				sendArray.push( { "first_name" : admin.myStudents[myArr[i]].first_name,
						 "last_name" : admin.myStudents[myArr[i]].last_name,
						 "img" : admin.myStudents[myArr[i]].img,
						 "isCorrectAnswer" : true
				});
			}
			else{
				sendArray.push( { "first_name" : admin.myStudents[myArr[i]].first_name,
				"last_name" : admin.myStudents[myArr[i]].last_name,
				"img" : admin.myStudents[i].img,
						 "isCorrectAnswer" : false
				});
			}
			
		}
		ws.send(JSON.stringify(sendArray));
$('input[type="checkbox"]').on('change', function() {
   $('input[type="checkbox"]').not(this).prop('checked', false);
});
	
	
	
	countImgs=countImgs+1;
	if(countImgs==admin.myStudents.length)
	{
		ws.send("DataLess");
		console.log("Dataless");
		endGame();
		$("#nextButton").append("<p> Game over</p>");
	}
			
	//setsAllFalse();
}


function endGame()
{
	
	$("#currentImg").remove();
	$("#nextButton").remove();
	$("#next").append('<p id="GameOver" style="font-size : 50px;color:yellow;font-weight:bold;"> Game over</p>');
	ws.send("Game Over");
	var getResult = '<div id="beforeResults" class="w3-padding-large w3-xlarge "> <p id="getResults" class="buttonRightGradient" > <button onClick="sendResults()">Get Results</button> </p> </div>';
	$("#GameOver").before(getResult);
	console.log("Dataless2");
}
function sendGameOver()
{

}
function sendResults()
{
	ws.send("Send Winner");
}
function getRndInteger(minimum, maximum) {
return Math.floor(Math.random() * (maximum - minimum)) + minimum;
}

function setsAllFalse()
{
	for(i=0;i<admin.myStudents.length;i++)
		admin.myStudents[i].isDisplayed = false;
	return;
}

function ensureArrayIsDifferent(myArray)
{
	var count = 0;
	while (count<3) {
    var random = getRndInteger(0,admin.myStudents.length);
    if (!myArray.includes(random)) {
        myArray.push(random);
		count=count+1;
    }
}
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function calculateScore()
{
	selectedValue = null;
	console.log("Here" );
	console.log(myArr);
	 if($("#customcb1").is(":checked"))
		 {
			 console.log("Answer is selected");
			 selectedValue = myArr[0];
		 }
	else if($("#customcb2").is(":checked"))
		 {
			 console.log("Answer is selected");
			 selectedValue = myArr[1];
		 }
	else if($("#customcb3").is(":checked"))
		 {
			 console.log("Answer is selected");
			 selectedValue = myArr[2];
		 }
	else if($("#customcb4").is(":checked"))
		 {
			 console.log("Answer is selected");
			 selectedValue = myArr[3];
		 }
	console.log("SelectedValue" + String(selectedValue));
	if(selectedValue==admin.correctAnswer)
		{
			console.log("Answer is correct");
			//alert("Answer is correct");
		}
	else{
		console.log("Answer is incorrect");
			//alert("Answer is incorrect, correct answer is " + admin.myStudents[admin.correctAnswer].first_name + ' ' +admin.myStudents[admin.correctAnswer].last_name );
	}
	
	displayNextImg();

}
/*
function blobToBase64(blob, callback) {
    var reader = new FileReader();
    reader.onload = function() {
        var dataUrl = reader.result;
        var base64 = dataUrl.split(',')[1];
        callback(base64);
    };
    reader.readAsDataURL(blob);
};*/
/*
const blobToBase64 = blob => {
	const reader = new FileReader();
	reader.readAsDataURL(blob);
	return new Promise(resolve => {
	  reader.onloadend = () => {
		resolve(reader.result);
	  };
	});
  };*/

  function previewFile(file) {
	//const preview = document.querySelector('img');
	//const file = document.querySelector('input[type=file]').files[0];
	const reader = new FileReader();
  
	reader.addEventListener("load", function () {
	  // convert image file to base64 string
	  console.log("In Here");
	  return reader.result;
	}, false);
  
	if (file) {
	  reader.readAsDataURL(file);
	}
  }
myi=0;
  function imageIsLoaded(e) {
	//$('#showImg').attr('src', e.target.result);
	//console.log(imageBase64.length);
	imageBase64.push(e.target.result);
	//console.log(imageBase64[myi]);
	myi=myi+1;
};



