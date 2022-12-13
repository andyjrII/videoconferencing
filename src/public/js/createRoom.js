function validateInput(roomName, roomDescription) {
    //check Room Name
    if(roomName.length > 2) {
        $("#roomName").removeClass("is-invalid");
    } else {
        $("#roomName").addClass("is-invalid");
    }

    //check Room Description
    if(roomDescription.length >= 10) {
        $("#roomDescription").removeClass("is-invalid");
    } else {
        $("#roomDescription").addClass("is-invalid");
    }

    if(roomName.length <= 2 || roomDescription.length < 10)
        return true;  //has errors
    return false;
}

function handleCreateRoomBtn() {
    $("#createRoomBtn").on("click", function(event) {
        event.preventDefault(); 
        event.stopImmediatePropagation(); 

        let id = $("#id").val();
        let roomName = $("#roomName").val();
        let roomDescription = $("#roomDescription").val();

       //Validate input 
       let check = validateInput(roomName, roomDescription);

        if(!check) {
            //send data to node server with AJAX
            //url mapped to http://localhost/create-room
            $.ajax({
                url: `${window.location.origin}/create-new-room`,
                method: "POST",
                data: {
                    id: id,
                    roomName: roomName,
                    roomDescription: roomDescription,
                },
                success: function(data) {
                    alert(`${roomName} Room Successfully Created`);
                    window.location.href = "/create-room";
                },
                error: function(err) {
                    alert(`An error occured! Pls try again later!`);
                }
            })
        }
    });
}

$(document).ready(function() {
    handleCreateRoomBtn();
});