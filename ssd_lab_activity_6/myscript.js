function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

function validateForm() {
    var name = document.teamForm.name.value;
    var email = document.teamForm.email.value;
    var username = document.teamForm.username.value;
    var teamlead = document.teamForm.teamlead.value;
        var dataPreview = "You've entered the following details: \n" +
                          "Manager Name: " + name + "\n" +
                          "Server Email: " + email + "\n" +
                          "UserName: " + username + "\n" +
                          "Team Lead: " + teamlead + "\n";
                        //   "Team Members: "+ teammem+ "\n";
        alert(dataPreview);
};


function validateuserName() {
    let username = document.teamForm.username.value;
    document.write(username);
    let pattern="(?=.\d)(?=.[A-Z]).*";
    document.getElementById("u1").innerHTML=/(?=.\d)(?=.[A-Z]).*/.test(username);
}


function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);
  }
  
  function dragging(event) {
    document.getElementById("demo").innerHTML = "The p element is being dragged";
  }
  
  function allowDrop(event) {
    event.preventDefault();
  }
  
  function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
    document.getElementById("demo").innerHTML = "The p element was dropped";
  }

  function passCheck() {
    if (document.getElementById('ppass').value != document.getElementById('conpass').value) {
        var tag = document.getElementById("p12");
        var text = document.createTextNode("Passwords are not matching"); 
        tag.appendChild(text);
    } 
}
