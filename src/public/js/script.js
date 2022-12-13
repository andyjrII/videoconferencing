const socket = io();
const chatInputBox = document.getElementById("chat-message");
const allMessages = document.getElementById("all-messages");
const leaveMeeting = document.getElementById("leave-meeting");
const mainChatWindow = document.getElementById("main-chat-window");
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement("video");
 
//PEERJS CONFIG
const peer = new Peer(undefined, {
  host: '/',
  port: '3001'
});

myVideo.muted = true;

const peers = {}
let myVideoStream;
let currentUserId;
let pendingMsg = 0;
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  myVideoStream = stream;
  addVideoStream(myVideo, stream, "me");

  socket.on('user-connected', (userId) => {
    //connectToNewUser(userId, stream);
    setTimeout(connectToNewUser, 1000, userId, stream);
  });

  socket.on('user-disconnected', userId => {
    if(peers[userId]) peers[userId].close();
  });

  document.addEventListener("keydown", (e) => {
    if(e.which === 13 && chatInputBox.value != "") {
      socket.emit("message", {
        msg: chatInputBox.value,
        user: currentUserId
      });
      chatInputBox.value = "";
    }
  });

  document.getElementById("sendMsg").addEventListener("click", (e) => {
    if(chatInputBox.value != "") {
      socket.emit("message", {
        msg: chatInputBox.value,
        user: currentUserId
      });
      chatInputBox.value = "";
    }
  });

  chatInputBox.addEventListener("focus", () => {
    document.getElementById("chat-btn").classList.remove("has-new");
    pendingMsg = 0;
    document.getElementById("chat-btn").children[1].innerHTML = `Chat`;
  });

  socket.on('createMessage', message => {
    console.log(message);
    let li = document.createElement("li");
    if(message.user != currentUserId) {
      li.classList.add("otherUser");
      li.innerHTML = `<div><b>${FULL_NAME} [<small>${MATRIC_NUMBER}</small>]: </b>${message.msg}</div>`;
    } else {
      li.innerHTML = `<div><b>Me: </b>${message.msg}</div>`;
    }

    allMessages.append(li);
    mainChatWindow.scrollTop = mainChatWindow.scrollHeight;
    if(message.user != currentUserId) {
      pendingMsg++;
      document.getElementById("chat-btn").classList.add("has-new");
      document.getElementById("chat-btn").children[1].innerHTML = `Chat (${pendingMsg})`;
    }
  });
});

peer.on('call', call => {
  getUserMedia({
    video: true,
    audio: true
  }, stream => {
      call.answer(stream);
      const video = document.createElement('video');
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
      }); 
    }, err => {
      console.log("Failed to get local stream", err);
    }
  );
});

peer.on('open', id => { 
  currentUserId = id;
  socket.emit('join-room', ROOM_ID, id);
});

socket.on("disconnect", () => {
  socket.emit("leave-room", ROOM_ID, currentUserId);
});

//CHAT
 
const connectToNewUser = (userId, streams) => {
  var call = peer.call(userId, streams);
  console.log(call);
  var video = document.createElement("video");
  
  call.on("stream", userVideoStream => {
    console.log(userVideoStream);
    addVideoStream(video, userVideoStream);
  });

  call.on("close", () => {
    video.remove();
  });

  peers[userId] = call;
};

const addVideoStream = (videoEl, stream, uId = "") => {
  videoEl.srcObject = stream;
  videoEl.id = uId;
  videoEl.addEventListener('loadedmetadata', () => {
    videoEl.play();
  });
  
  videoGrid.append(videoEl);
  let totalUsers = document.getElementsByTagName("video").length;
  if(totalUsers > 1) {
    for(let index = 0; index < totalUsers; index++) {
      document.getElementsByTagName("video")[index].style.width = 100 / totalUsers + "%";
    }
  }
}

const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if(enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnMuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
}

const setMuteButton = () => {
  const html = `<i class="fa-solid fa-microphone"></i>
                <span>Mute</Span>`
  document.querySelector('#muteButton').innerHTML = html;
}

const setUnMuteButton = () => {
  const html = `<i class="unmute fa-solid fa-microphone-slash"></i>
                <span>UnMute</Span>`
  document.querySelector('#muteButton').innerHTML = html;
}

const playStop = () => {
  let enabled = myVideoStream.getVideoTracks()[0].enabled;
  if(enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo();
  } else {
    setStopVideo()
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
}

const setStopVideo = () => {
  const html = `<i class="fa-solid fa-video"></i>
                <span>Stop Video</span>`
  document.querySelector('#playPauseVideo').innerHTML = html;
}

const setPlayVideo = () => {
  const html = `<i class="stop fa-solid fa-video-slash"></i>
                <span>Play Video</span>`
  document.querySelector('#playPauseVideo').innerHTML = html;
}

const ShowChat = (e) => {
  e.classList.toggle("active");
  document.body.classList.toggle("showChat");
};

$(document).ready(function() {
  $('.leave-meeting').click(function() {
      window.location.href = `/create-room`;
  });
});