function validateInput(fullName, username, password, confirmPassword) {
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

    //check fullName
    if(fullName.length > 4) {
        $("#fullName").removeClass("is-invalid");
    } else {
        $("#fullName").addClass("is-invalid");
    }

    //check username
    if(username.match(USERNAME_REGEX)) {
        $("#username").removeClass("is-invalid");
    } else {
        $("#username").addClass("is-invalid");
    }

    //check password
    if(password.match(PASSWORD_REGEX)) {
        $("#password").removeClass("is-invalid");
    } else {
        $("#password").addClass("is-invalid");
    }

    //check confirmPassword
    if(confirmPassword === password) {
        $("#confirmPassword").removeClass("is-invalid");
    } else {
        $("#confirmPassword").addClass("is-invalid");
        
    }

    if(fullName.length < 5 || !username.match(USERNAME_REGEX) || !password.match(PASSWORD_REGEX) || confirmPassword !== password)
        return true;  //has errors
    return false;
}

function handleClickRegisterBtn() {
    $("#registerBtn").on("click", function(event) {
        event.preventDefault();

        let fullName = $("#fullName").val();
        let username = $("#username").val();
        let matricNo = $("#matricNumber").val();
        let matricNumber = matricNo.toUpperCase();
        let level = $("#level").val();
        let session = $("#session").val();
        let picture = $("#picture").val();
        let password = $("#password").val();
        let confirmPassword = $("#confirmPassword").val();

       //Validate input 
       let check = validateInput(fullName, username, password, confirmPassword);

        if(!check) {
            //send data to node server with AJAX
            //url mapped to http://localhost/register-new-user
            $.ajax({
                url: `${window.location.origin}/register-new-user`,
                method: "POST",
                data: {
                    fullName,
                    username,
                    matricNumber,
                    level,
                    session,
                    picture,
                    password,
                },
                success: function(data) {
                    alert("Account successfully created!");
                    window.location.href = "/"; 
                },
                error: function(err) {
                    console.log("The error:", err);
                    alert(`Check your info & try again!`);
                }
            })
        }
    });
}

function validateLInput(fullName, username, password, confirmPassword) {
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

    //check fullName
    if(fullName.length > 4) {
        $("#fullName").removeClass("invalid-feedback");
    } else {
        $("#fullName").addClass("invalid-feedback");
    }

    //check username
    if(username.match(USERNAME_REGEX)) {
        $("#username").removeClass("invalid-feedback");
    } else {
        $("#username").addClass("invalid-feedback");
    }

    //check password
    if(password.match(PASSWORD_REGEX)) {
        $("#password").removeClass("invalid-feedback");
    } else {
        $("#password").addClass("invalid-feedback");
    }

    //check confirmPassword
    if(confirmPassword === password) {
        $("#confirmPassword").removeClass("invalid-feedback");
    } else {
        $("#confirmPassword").addClass("invalid-feedback");
        
    }

    if(fullName.length < 5 || !username.match(USERNAME_REGEX) || !password.match(PASSWORD_REGEX) || confirmPassword !== password)
        return true;  //has errors
    return false;
}

function handleClickLRegisterBtn() {
    $("#lRegisterBtn").on("click", function(event) {
        event.preventDefault();

        let fullName = $("#lFullName").val();
        let username = $("#lUsername").val();
        let picture = $("#lPicture").val();
        let password = $("#lPassword").val();
        let confirmPassword = $("#lConfirmPassword").val();

       //Validate input 
       let check = validateLInput(fullName, username, password, confirmPassword);

        if(!check) {
            //send data to node server with AJAX
            //url mapped to http://localhost/register-new-user
            $.ajax({
                url: `${window.location.origin}/register-new-user`,
                method: "POST",
                data: {
                    fullName,
                    username,
                    matricNumber: "",
                    level: "",
                    session: "",
                    picture,
                    password,
                },
                success: function(data) {
                    alert("Account successfully created!");
                    window.location.href = "/"; 
                },
                error: function(err) {
                    console.log("The error:", err);
                    alert(`A username ${username} already exists!`);
                }
            })
        }
    });
}

$(document).ready(function() {
    handleClickRegisterBtn();
    handleClickLRegisterBtn();
});