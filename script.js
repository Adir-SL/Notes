function loadFunc() {
    loadedList = localStorage.getItem("myList");
    if (loadedList) {
      document.getElementById("myList").innerHTML = loadedList;
    }
    // alert(loadedList);
  }
  function addLi() {
    document.getElementById("myList").innerHTML +=
      '<li onclick="toggleRemoved(event);" ondblclick="liDblClick(event);">' + document.getElementById("myInput").value + '</li>';
    localStorage.setItem("myList", document.getElementById("myList").innerHTML);
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
  
  window.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      btnClick();
    }
  });

  function toggleRemoved(event){
    if (event.target.className == "removed") {
      event.target.className = "";
    } else {
      event.target.className = "removed";
      event.target.setAttribute("contenteditable", false);
      if(document.getElementById("removeToggle").checked){
          event.target.style.height = "0";
          event.target.style.minHeight = "0";
          event.target.style.marginTop = "0";
          event.target.style.paddingBottom = "0";
      }
    }
    localStorage.setItem("myList", document.getElementById("myList").innerHTML);
  }
  function liDblClick(event){
    event.target.setAttribute("contenteditable", true);
    event.target.focus();
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