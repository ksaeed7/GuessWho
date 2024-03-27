var script = document.createElement("SCRIPT");
    script.src = 'jquery.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);
client = {
    first_name: "",
    last_name: "",
    accessCode: "",
    score: 0
};
winner = {
    first_name: "",
    last_name: "",
    //accessCode: "",
    score: -5
};
function connectToServer(){
     ws = new WebSocket("ws://75.101.170.211:8084");
    client.first_name = $("#fName").val();
	client.last_name = $("#lName").val();
	client.accessCode = $('#aCode').val();
	students = new Array();
    

console.log("Begin");
ws.addEventListener("open", () =>
{
    console.log("We are connected");
    client_send = ["0",String(client.accessCode)];
    ws.send(client_send);
    
}
);
removeElement = false;
endGame = false;
ws.addEventListener("message", e =>
{
    //console.log("E Data is " + e.data);
    if(e.data.includes(","))
		{
            
			myData = JSON.parse(e.data);
			//myData = e.data.split(',');
			console.log(myData);
			if(myData[0]=="Winner")
			{
                endGame = true;
                winner["first_name"] = myData[1]["first_name"];
                winner["last_name"] = myData[1]["last_name"];
                winner["score"] = myData[1]["score"];
				//winner = JSON.parse(myData[1]);
				console.log(winner);
                $("#currentImg").remove();
                $("#myTable").remove();
                $("#scoreLabel").remove();
                if(winner["first_name"]==client["first_name"] && winner["last_name"]==client["last_name"])
                {
                    var gameOverString = '<p style="font-size: 80px; font-weight:bold; color:yellow"> Game Over</p>'+
	 			'<p style="font-size: 90px"> YOU WON </p>'+
				//'<p style="font-size: 50px"> With a Score of: <a1 style="color:yellow">' + winner["score"]+ '           </a1></p>'+
                '<p style="font-size: 50px"> Your Score: <a1 style="color:yellow">' + client["score"]+ '           </a1></p>';
                }
                else{
                var gameOverString = '<p style="color:yellow; font-size: 80px; font-weight:bold"> Game Over</p>'+
	 			'<p style="font-size: 50px"> Winner is: '+ winner["first_name"] + ' ' + winner["last_name"] + '</p>' +
				'<p style="font-size: 50px"> With a Score of: <a1 style="color:yellow">' + winner["score"]+ '           </a1></p>'+
                '<p style="font-size: 50px"> Your Score: <a1 style="color:yellow">' + client["score"]+ '           </a1></p>';
                }
				$(".w3-display-middle").append(gameOverString);

			}
		}
    if(e.data == "1")//checkaccessCode(getAccessCode))
		{
			
			//window.myStudent.studentAccessCode = getAccessCode;
			console.log("Access Code is " + String(client.accessCode));
			if(removeElement == true)
				$("#redItem").remove();

                $("#getForm").remove();
                var addStudentLabels = '<div class="w3-display-topleft w3-padding-large w3-xlarge "> '+
                '<p style="font-size: 45px; left: 5%"><img src="profileIcon.png" width="40" height="40" alt="Profile Picture"> '+
                 client.first_name + ' '+client.last_name +
                    '</p>'+
                
              '</div>'+
            '<div id="accessCodeImg" class="w3-display-topright w3-padding-large w3-xlarge "> '+
                
                '<p style="font-size: 45px; left: 5%"> <img src="star.png" width="40" height="40" alt="Access Code Picture">'+
                'Access Code: '       + client.accessCode+
                    '</p>'+
                
              '</div> ';
            $(".w3-display-container").append(addStudentLabels);
			//POST DATA HERE
			//self.location = "createGame.html";
			//gameScreen();
		}
	else if (e.data == "0")
		{
			console.log("Access Code is " + String(client.accessCode));
			var addElement = '<p id="redItem"> *The Access Code is not found </p>';
            if(removeElement == false)
			    $("#fName").before(addElement)
			removeElement = true;
		} // fix this reentry
    else if (e.data == "Game Over")
		{
			console.log("Game is over");
			ws.send(JSON.stringify(client));
		} 
    else{
        if(endGame == false && e.data != "Update Scores"){
        console.log(e);
        startGame(e.data);
        }
    }
    //console.log(e.data);
}
);
	//console.log();
    

	
	 //myStudent = new Student(getFName,getLName);
	/*if(true)//checkaccessCode(getAccessCode))
		{
			
			//window.myStudent.studentAccessCode = getAccessCode;
			console.log("Access Code is " + String(client.accessCode));
			if(false)
				$("#redItem").remove();

            
            $(".w3-display-container").append(addStudentLabels);
			//POST DATA HERE
			//self.location = "createGame.html";
			//gameScreen();
		}
	else
		{
			console.log("Access Code is " + String(myStudent["studentAccessCode"]));
			var addElement = '<p id="redItem"> *The Access Code is not found </p>'
			$("#fName").before(addElement)
			removeElement = true;
		}*/




}

askUserInputs();

function askUserInputs()
{
	var inputHTMLForm=  '<a id="getForm">'+
      '<p><input id="fName" class="w3-input w3-padding-16 w3-border" type="text" placeholder="First Name" required name="FName"></p>'+ 
	   '<p><input id="lName"  class="w3-input w3-padding-16 w3-border" type="text" placeholder="Last Name" required name="LName"></p>'+
      '<p><input id="aCode" class="w3-input w3-padding-16 w3-border" type="text" placeholder="Access Code" required name="accessCode"></p>'+
      '<p><button onClick="connectToServer()">SUBMIT</button></p>';//+
    '</a>';
	$(".addForm").append(inputHTMLForm);
	//myTimeOut = setTimeout(destroyer,300000);
	//window.myVar = 10058;
}



var countImgs = 0;
function startGame(data)
{
    //console.log(data);
    
    if(students.length > 0)
    {
        isCorrect = checkSelected();
        myClient = ["1",  client.first_name, client.last_name,client.accessCode,client.score ] ;
    console.log(myClient);
    ws.send(myClient);
        /*if(isCorrect)
        {
            correctStatement = '<p id="correctStatement"> 
            $("#currentImg").before(correntStatement);
        }*/
        
        students = [];
        $("#currentImg").remove();
        $("#myTable").remove();
        $("#score").remove();
        scoreValue = '<a id="score" style="color: yellow">'+client["score"]+'</a>';
        $("#scoreLabel").append(scoreValue);
    }
    else{
        myClient = ["1",  client.first_name, client.last_name,client.accessCode,client.score ] ;
    console.log(myClient);
    ws.send(myClient);
        scoreHTML = '<div id="scoreLabel" class=" w3-padding-large w3-xlarge" style="margin-right: 15%; font-weight: bold;"> Score:  </div>'
        $("#accessCodeImg").append(scoreHTML);
        scoreValue = '<a id="score" style="color: yellow">'+client["score"]+'</a>';
        $("#scoreLabel").append(scoreValue);
    }

    console.log("Data is empty");
    console.log(students);
    myData =JSON.parse(data);
    students.push(myData[0]);
    students.push(myData[1]);
    students.push(myData[2]);
    students.push(myData[3]);
    console.log(students);
    correctAnswer = -1;
    for(i=0;i<4;i++)
    {
        if(students[i].isCorrectAnswer==true)
        {
            console.log(i);
            correctAnswer=i;
        }
    }
    console.log(students[correctAnswer].first_name);
    //console.log(students[correctAnswer].img);
    var imageHTML = '<img id="currentImg" src='+students[correctAnswer].img+' height="400" width="400" />';
    $(".addForm").append(imageHTML);

    var tableHtml ='<table id="myTable" style="width:100%; white-space: nowrap">'+
'<tr >'+
' <td class="leftTable"> '+
        '<div class="yellow customcb">'+
          '<input type="checkbox" value="1" id="customcb1" name="customcb[1]" />'+
          '<label class="inner" for="customcb1"></label>'+
         '<a3 id="topLeftTableLabel" style="font-size: 30px; "><label class="outer" for="customcb1" id="customcb1_text" >'+
            students[0].first_name+' '+students[0].last_name+
    '</label></a3>'+
    '</div>'+
'</td>'+
'<td class="rightTable">'+
 '<div class="yellow customcb">'+
          '<input type="checkbox" value="1" id="customcb2" name="customcb[2]" />'+
          '<label class="inner" for="customcb2"></label>'+
         '<a3 id="topRightTableLabel" style="font-size: 30px; "><label class="outer" for="customcb2" id="customcb2_text" >'+
            students[1].first_name+' '+students[1].last_name+'</label></a3>'+
    '</div> '+
  
 '</td>'+
'</tr>'+
'<tr>'+
'<td style="padding-top: 100px "> '+
        '<div class="yellow customcb">'+
          '<input type="checkbox" value="1" id="customcb3" name="customcb[3]" />'+
          '<label class="inner" for="customcb3"></label>'+
         '<a3 id="bottomLeftTableRight" style="font-size: 30px; "> <label class="outer" for="customcb3" id="customcb3_text" >'+
            students[2].first_name+' '+students[2].last_name+'</label></a3>'+
    '</div>'+
'</td>'+
'<td class="rightTable" style="padding-top: 100px ">'+
 '<div class="yellow customcb">'+
          '<input type="checkbox" value="1" id="customcb4" name="customcb[4]" />'+
          '<label class="inner" for="customcb4"></label>'+
         '<a3 id="bottomRightTableLabel" style="font-size: 30px; "><label class="outer" for="customcb4" id="customcb4_text" >'+students[3].first_name+' '+students[3].last_name+'</label> </a3>'+
    '</div>  '+
 '</td>'+
' </tr>'+

'</table>';

$("#next").before(tableHtml);
$('input[type="checkbox"]').on('change', function() {
$('input[type="checkbox"]').not(this).prop('checked', false);
});
}
function checkSelected()
{
    selectedValue = -1;
    if($("#customcb1").is(":checked"))
     {
         console.log("Answer is selected");
         selectedValue = 0;
     }
else if($("#customcb2").is(":checked"))
     {
         console.log("Answer is selected");
         selectedValue = 1;
     }
else if($("#customcb3").is(":checked"))
     {
         console.log("Answer is selected");
         selectedValue = 2;
     }
else if($("#customcb4").is(":checked"))
     {
         console.log("Answer is selected");
         selectedValue = 3;
     }

     if(selectedValue==correctAnswer)
     {
            client["score"] = client["score"] + 10;
            console.log(client["score"]);
            return true;
     }
     return false;
}
 //myName = 'khalid';
