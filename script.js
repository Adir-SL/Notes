function loadFunc() {
  window.actualToday = new Date();
  window.today = new Date();
  window.yesterday = new Date(today);
  document.getElementById("todayDate").innerText = window.actualToday.toDateString();
    loadedList = localStorage.getItem("myList "+document.getElementById("todayDate").innerText);
    if (loadedList) {
      document.getElementById("myList").innerHTML = loadedList;
    }
    // alert(loadedList);
  }
  function addLi() {
    document.getElementById("myList").innerHTML +=
      '<li onclick="toggleRemoved(event);" ondblclick="liDblClick(event);" onblur="loseEditables();" spellcheck=false>' + document.getElementById("myInput").value + '<modbtns><button class="editBtn"><i class="material-icons">edit</i></button><button class="delBtn"><i class="material-icons">delete</i></button></modbtns></li>';
    localStorage.setItem("myList "+document.getElementById("todayDate").innerText, document.getElementById("myList").innerHTML);
  }
  function clearLi() {
    document.getElementById("myInput").value = "";
  }
  function btnClick() {
    if (document.getElementById("myInput").value !== "") {
      addLi();
      clearLi();
    }
  }
  
  window.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      var x = document.getElementsByTagName("li");
      var i;
      for (i = 0; i < x.length; i++) {
        x[i].setAttribute("contenteditable", false);
        localStorage.setItem("myList "+document.getElementById("todayDate").innerText, document.getElementById("myList").innerHTML);
      }
      checkMods();
      btnClick();
    }
  });

  function loseEditables(){
    var x = document.getElementsByTagName("li");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].setAttribute("contenteditable", false);
    }
    checkMods();
    localStorage.setItem("myList", document.getElementById("myList").innerHTML);
  }
  function startTimer(){
    setTimeout(function(){
      var x = document.getElementsByTagName("li");
      var i;
      for (i = 0; i < x.length; i++) {
        x[i].setAttribute("contenteditable", false);
      }

      var x = document.getElementsByClassName("delBtn");
      var i;
      for (i = 0; i < x.length; i++) {
        x[i].className = "delBtn";
      }
    }, 3000);
  }

  function checkMods(){
    var x = document.getElementsByTagName("li");
    var i;
    for (i = 0; i < x.length; i++) {
      if(x[i].innerHTML.slice(-8) == "modbtns>"){
      }else{
        x[i].innerHTML += '<modbtns><button class="editBtn"><i class="material-icons">edit</i></button><button class="delBtn"><i class="material-icons">delete</i></button></modbtns>';
      }
    }
  }
  function toggleRemoved(event){
    if(event.target.tagName == "button" || event.target.tagName == "BUTTON"){
      if(event.target.className == "editBtn"){
        var x = document.getElementsByTagName("li");
        var i;
        for (i = 0; i < x.length; i++) {
          x[i].setAttribute("contenteditable", false);
        }
        event.target.parentNode.parentNode.setAttribute("contenteditable", true);
        event.target.parentNode.parentNode.focus();
      }
      if(event.target.classList[0] == "delBtn"){
        if(event.target.classList[1] == "doubleCheck"){
          event.target.parentNode.parentNode.outerHTML = "";
          localStorage.setItem("myList", document.getElementById("myList").innerHTML);
        }else{
          event.target.className += " doubleCheck";
          startTimer();
        }
      }
    }else{
      if(event.target.contentEditable == "true"){
      }else{
        if (event.target.className == "removed") {
          event.target.className = "";
          localStorage.setItem("myList", document.getElementById("myList").innerHTML);
        } else {
          event.target.className = "removed";
          event.target.setAttribute("contenteditable", false);
          localStorage.setItem("myList", document.getElementById("myList").innerHTML);
          if(document.getElementById("removeToggle").checked){
              event.target.style.height = "0";
              event.target.style.minHeight = "0";
              event.target.style.marginTop = "0";
              event.target.style.paddingBottom = "0";
          }
        }
      }
    }
  }
  function liDblClick(event){
    // event.target.setAttribute("contenteditable", true);
    // event.target.focus();
  }
  function hideClick() {
    if (document.getElementById("removeToggle").checked) {
      var x = document.getElementsByClassName("removed");
      var i;
      for (i = 0; i < x.length; i++) {
        x[i].style.height = "0";
        x[i].style.minHeight = "0";
        x[i].style.marginTop = "0";
        x[i].style.paddingBottom = "0";
      }
    } else {
      var x = document.getElementsByClassName("removed");
      var i;
      for (i = 0; i < x.length; i++) {
        x[i].style.height = "fit-content";
        x[i].style.minHeight = "2em";
        x[i].style.marginTop = "1em";
        x[i].style.paddingBottom = "0.5em";
      }
    }
    localStorage.setItem("myList", document.getElementById("myList").innerHTML);
  }
  function openDialog() {
    document.getElementById("deleteDialog").style.display = "block";
  }
  function closeDialog() {
    document.getElementById("deleteDialog").style.display = "none";
  }
  window.addEventListener("click", function () {
    if (event.target.id == "deleteButton") {
      localStorage.removeItem("myList");
      setTimeout(function(){location.reload();}, 500);
      closeDialog();
    }
  });

  function dateMinus(){
    console.log("minus");

    window.yesterday.setDate(window.yesterday.getDate() - 1)

    // today.toDateString()
    document.getElementById("todayDate").innerText = window.yesterday.toDateString();
    window.today = window.yesterday;

    if(window.today.toDateString() == window.actualToday.toDateString()){
      document.getElementById("todayDate").classList.add("bold");
    }else{
      document.getElementById("todayDate").classList.remove("bold");
    }

    loadFunc();
  }

  function datePlus(){
    console.log("+");

    window.yesterday.setDate(window.yesterday.getDate() + 1)

    // today.toDateString()
    document.getElementById("todayDate").innerText = window.yesterday.toDateString();
    window.today = window.yesterday;

    if(window.today.toDateString() == window.actualToday.toDateString()){
      document.getElementById("todayDate").classList.add("bold");
    }else{
      document.getElementById("todayDate").classList.remove("bold");
    }
    loadFunc();
  }

  function gotoToday(){
    window.actualToday = new Date();
    window.today = new Date();
    window.yesterday = new Date(today);
    document.getElementById("todayDate").innerText = window.today.toDateString();
    document.getElementById("todayDate").classList.add("bold");

    loadFunc();
  }