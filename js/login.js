function validateForm() {
    var username = document.forms["loginForm"]["uname"].value;
    let psword = document.forms["loginForm"]["psw"].value
    if (username != "admin") {
      alert("Username Wrong");
      return false;
    } else if (psword != "1234") {
        alert("Password Wrong");
        return false;
    }
  }