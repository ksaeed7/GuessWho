


const WebSocket = require("ws");
myObj = {"accessCode": {"-1":
            {
                "first_name": "example",
                 "last_name": "last",
                 "img" : "img",
                 "isDisplayed": false
            }
        }
}; 
addStructure = {
    "first_name": "",
     "last_name": "",
     "img" : "",
     "isDisplayed": false
};
number_of_servers = 0;
is_created = [];

sendDataToClient = "";
/*myObj["accessCode"]["2500"] = {
    "first_name": "example",
                 "last_name": "last",
                 "img" : "img",
                 "isDisplayed": false
}
console.log(myObj["accessCode"]);
console.log(myObj["accessCode"]["1000"]);
console.log("Begin");*/
const clientServer = new WebSocket.Server({port:portNum});

const adminServer = new WebSocket.Server({port:portNum});
console.log("Brgin");
const clients = new Set();
const admins = new Set();
clientsData = new Array();
clientsDatatemp = new Array();
updateStudentsLog = new Array();
tempSet = new Set();
tempArray = new Array();
endGame = false;
clientServer.on("connection", ws => {
    
  //  console.log(clients.size);
        //for(i=0;i<clients.size;i++) {
            //console.log(clients[i]);1
           // console.log(ws);
         //  console.log(clients.size);
          //  if(clients[i]==ws)
          //  {
           //     console.log("You are currently sending message to client " + String(i));
           // } }
                
        
    console.log("New Client Connected");
    ws.on("message", data =>
    {
        data=data.split(",");
        if(data[0].includes("first_name")){
            newData = JSON.parse(data);
            console.log(newData[0]);
            endGame = true;
            console.log(newData);
        }
        if(data[0]=="0")
        {
            console.log(initialConnection);
            admins.forEach(function each(admin)
            {
                    if(data[1]==admin.id)
                    {
                        ws.id=data[1];
                        clients.add(ws);
                        console.log("There are " + String(clients.size) + " clients connected.");
                        ws.send("1");
                    }
                    else
                    {
                        ws.send("0");
                    }
            }
            );
        }
        if(data[0]=="1")
        {
            //console.log(data)
            updateInfo = 
            {
                first_name: data[1],
                last_name:  data[2],
                accessCode:  data[3],
                score:  data[4]
            };
            //console.log(updateInfo);
            //updatedData = JSON.parse(data[1]);
            clientsDatatemp.push(updateInfo);
        }
        if(endGame == true)
        {
            clientsData.push(newData);

            endGame = false;
        }
       // clients.add(ws);
        //check if there is access code here 

        //doesnt do anything
        
        //ws.send(sendDataToClient);
    }
    
    )
    ws.on("close", ()=> {
        //console.log("New Client disConnected");
        clients.forEach(function each(client)
        {
            console.log("Client disconnected: \Client before closure : " + String(clients.size));
            if(client.id == ws.id)
            {
                clients.delete(ws);
                console.log("Client after closure : " + String(clients.size));
            }
        }
        );
        
    });
});


initialConnection = false;

adminsList = [{
  "-1": ["Error"]
}];
dontSendToServer = false;
adminServer.on("connection", ws => {
    console.log("Admin Connected");
    


    ws.on("message", data =>{
        dontSendToServer = false;
    
        //Sconsole.log(data);
        if(data.length<100){
            if(data.includes(','))
                data = data.split(",");
       // console.log(data);
        }
        if(String(data[0])== "ADD NEW ADMIN")
        {
            console.log(data);
            ws.id = data[1];
            admins.add(ws);
            console.log("There are " + String(admins.size) + " admins connected.");
            initialConnection = true;
            
        }
        if(String(data[0])=="Game Over")
        {
            data = data[0];
            console.log(data);
        }
        if(String(data)=="Update Scores")
        {
            data = data[0];
            dontSendToServer = true;
            //console.log("This is the clientsData");
           // console.log(clientsDatatemp);
            for(i = 0; i< clientsDatatemp.length;i++)
            {
               
                if(clientsDatatemp[i].accessCode == String(ws.id))
                {
                    tempArray.push(clientsDatatemp[i].score);
                }
            }
           // console.log(tempArray);
            tempArray.sort(function(a, b){return b - a});
           // console.log(tempArray);
            for(i=0;i<tempArray.length;i++)
            {
                tempSet.add(tempArray[i]);
            }
           // console.log(tempSet);
           // console.log(tempSet[0]);
            
            tempSet.forEach(function each(itSet)
            {
                for(j=0;j<clientsDatatemp.length;j++)
                {
                    if(clientsDatatemp[j].accessCode == String(ws.id))
                    {
                        //console.log("here");
                        if(clientsDatatemp[j].score==String(itSet))
                        {
                           // console.log("here1");
                            updateStudentsLog.push(clientsDatatemp[j]);
                        }
                    }
                }
            });
          //  console.log(JSON.stringify(updateStudentsLog));
            ws.send(JSON.stringify(updateStudentsLog));
            clientsDatatemp = [];
            tempArray = [];
            updateStudentsLog = [];
            tempSet.clear();
            //console.log("recieved update");
        }
        if(String(data)=="Send Winner")
        {
            data = data[0];
            increment = 0;
            while(true)
            {
                console.log("EndlessLoop?");
                if(clientsData[increment].accessCode == ws.id)
                {
                    break;
                }
                increment = increment + 1;
            }
            var currentWinner = clientsData[increment].score;
           // console.log(currentWinner);
           // 
            for(i = 0; i< clientsData.length;i++)
            {
               // console.log(clientsData.length);
                if(clientsData[i].accessCode == ws.id)
                {
                    //console.log("clientsDatength");
                    if(clientsData[i].score > currentWinner)
                    {
                        console.log("Current Winner");
                        console.log(currentWinner);
                        currentWinner = clientsData[i].score;
                        increment = i;
                    }
                }
                
            }
            data = JSON.stringify(["Winner", clientsData[increment]]);
            ws.send(data);
           // console.log(data);
        }
        //myObj["accessCode"][data] = addStructure;
        /*if(initialConnection == false)
        {
        initialConnection = true;
        console.log(data);
        is_created[number_of_servers] = true;
        number_of_servers=number_of_servers+1;
        }*/
        if(dontSendToServer==false)
        {
        
        sendDataToClient = data;
        doStuff(ws);
        
        }
    })
    ws.on("close", ()=> {
        
        admins.forEach(function each(admin)
            {
            console.log("Admin disconnected: \nAdmins before closure : " + String(admins.size));
            if(admin.id == ws.id)
            {
                for(i=0;i<clientsData.length;i++)
                {
                    //console.log(clientsData.length);
                    if(clientsData[i].accessCode == admin.id)
                    {
                        clientsData.splice(i,1);
                        i=i-1;
                        console.log("Removed Client Data");
                        console.log(clientsData);
                    }
                    
                }
                admins.delete(ws);
                console.log("Admins after closure : " + String(admins.size));
                clients.forEach(function each(client)
                    {
                        console.log("Client disconnected: \Client before closure : " + String(clients.size));
                        if(client.id == admin.id)
                        {
                            clients.delete(client);
                            console.log("Client after closure : " + String(clients.size));
                        }
                    }
                    );
            }
        
        console.log("Admin disConnected");
        });

});
});
function doStuff(adminSend)
{
    if(clients.size<1)
    {
        //setInterval(doStuff,3000);
    }
    else
    {
        clientServer.clients.forEach(function each(client) {
            if(client.id == adminSend.id){
            client.send(sendDataToClient);
            console.log('Sent: ');
            }
          });
    }
}
/*
while(true)
{


}*/
/*
clientServer.on("connection", admin =>{


} );*/