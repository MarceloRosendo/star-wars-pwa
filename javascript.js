
window.onload = () => {
  if ('speechSynthesis' in window) {
    doSpeechSynthesis();
  } else {
    msg = document.createElement('h5');
    msg.textContent = "Detected no support for Speech Synthesis";
    msg.style.textAlign = 'center';
    msg.style.backgroundColor = 'red';
    msg.style.color = 'white';
    msg.style.marginTop = msg.style.marginBottom = 0;
    document.body.insertBefore(msg, document.querySelector('#SpeechSynthesis'));
  }
}
const maxOfMessagesOnHistory = 10;
const saveOnLocalStorage = (content) => {
  var history = localStorage.getItem('history')
  if (history) {
    history = JSON.parse(history)
    if (history.length > maxOfMessagesOnHistory) {
      history.shift()
    }
  } else {
    history = []
  }
  history.push(content)
  localStorage.setItem('history', JSON.stringify(history));
}
doSpeechSynthesis = () => {
  var synth = speechSynthesis;
  var flag = false;

  if (synth.speaking) {
    flag = false;
    synth.cancel();
  }

  var playEle = document.querySelector('#speechplay');

  /* click event handlers for the buttons */
  playEle.addEventListener('click', onLaunch);

  var voices = [];

  populateVoiceList();

  function populateVoiceList() {
    voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if (aname < bname)
        return -1;
      else if (aname == bname)
        return 0;
      else
        return +1;
    });
  }

  function onLaunch() {
    if (!flag) {
      flag = true;
      const name = document.getElementById('jediName').value
      const spaceShip = document.getElementById('jediSpeceshipName').value
      const messageToSpeak = `Atenção, o piloto ${name} da nave ${spaceShip} está decolando`;
      utterance = new SpeechSynthesisUtterance(messageToSpeak);

      utterance.voice = voices[20];

      utterance.onend = () => {
        flag = false;
        // save on localstorage
        saveOnLocalStorage(messageToSpeak)
      }
      synth.speak(utterance);

      let r = setInterval(() => {
        console.log(speechSynthesis.speaking);
        if (!speechSynthesis.speaking) {
          clearInterval(r);
        } else {
          speechSynthesis.resume();
        }
      }, 14000);
    }
    if (synth.paused) {
      synth.resume();
    }
  }
}

const onLaunch = () => {
  const jediName = document.getElementById('jediName').value
  const spaceShip = document.getElementById('jediSpeceshipName').value
  onLaunch(jediName, spaceShip)
}

myFunction = () => {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const redirectToHistory = () => {
  location.href = 'history.html'
}


