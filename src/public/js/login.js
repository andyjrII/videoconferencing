function handleLoginBtn() {
    $("#loginBtn").on("click", function(event) {
        event.preventDefault();
        
        let username = $("#username").val();
        let password = $("#password").val();       

        $.ajax({
            url: `${window.location.origin}/login`,
            method: "POST",
            data: {
                username,
                password
            },
            success: function(data) {
                alert(`${username} successfully logged in!`);
                window.location.href = `/create-room`;
            },
            error: function(err) {
                alert(`Invalid credentials!`);
            }
        });
    });
}

$(document).ready(function() {
    handleLoginBtn();
});