//var botUrl = 'http://localhost:3979/';
var botUrl = 'https://chatbot-stb.azurewebsites.net/';

function prepareFrame() {
	var container = document.createElement("div");
	container.setAttribute("id", "sp-bot-div-full");
    document.body.appendChild(container);

    var botConnection = new BotChat.DirectLine({
        secret: 'IZtT1MEy6KY.0LGeKQK84SYJ19GLopjjPoiM8clkIylB9xsPdXCbd-Y'
    });

    var user = {
        id: 'moi',
        name: 'moi'
    };
    var bot = {
        id: 'Nour',
        name: 'Nour'
    };

    BotChat.App({
        botConnection: botConnection,
        user: user,
        bot: bot,
        showUploadButton: false,
        locale: 'fr-fr',
        resize: 'detect'
    }, document.getElementById("sp-bot-div-full"));

    botConnection
        .postActivity({ type: "event", value: "", from: { id: "moi" }, name: "buttonClicked" })
        .subscribe(id => console.log("success"));

	  console.log(document.getElementsByClassName('wc-header')[0].innerHTML);
      
    document.getElementsByClassName('wc-header')[0].innerHTML = "<span>Aide</span>";
    appendHtml(document.getElementsByClassName("wc-header")[0], '<span id="sp-bot-close-chat" onclick="closeBotIframe();"> x</span>');
    document.getElementById("sp-bot-close-chat").style.display = "block";

    //document.getElementsByClassName("wc-header")[0].onmouseover = function () { headerMouseOut() };
    //document.getElementsByClassName("wc-header")[0].onmouseout = function () { headerMouseOver() };
	
}

function appendHtml(el, str) {
	var div = document.createElement('div');
	div.innerHTML = str;
	while (div.children.length > 0) {
	  el.appendChild(div.children[0]);
	}
  }

  function renderIframeLauncher(){
      var launcher = '<a href="javascript:void(null)" id="sp-bot-iframe-launcher" onclick="openBotChat();"><img id="sp-chat-image" src="' + botUrl + 'img/chat.svg" /></a>';
      appendHtml(document.body, launcher);    
    }

// function headerMouseOver() {
//     document.getElementById("sp-bot-close-chat").style.display = "none";
// }

// function headerMouseOut() {
//     document.getElementById("sp-bot-close-chat").style.display = "block";
// }

function openBotChat() {
    var currentStyle = document.getElementById("sp-bot-div-full").style.visibility;
    if (currentStyle === "hidden" || currentStyle === '') {
        document.getElementById("sp-bot-div-full").style.visibility = "visible";
        document.getElementById("sp-chat-image").src = botUrl + "img/cancel.svg";
        document.getElementById("sp-chat-image").className = "close-chat-icon";
    } else {
        closeBotIframe();
    }

}

function closeBotIframe(){
    document.getElementById("sp-bot-div-full").style.visibility = "hidden";
    document.getElementById("sp-chat-image").src = botUrl + "img/chat.svg";
    document.getElementById("sp-chat-image").className = "";
}

// function addCssToFrame() {
//     var cssLink = document.createElement("link");
// 	cssLink.href = "main.css"; 
// 	cssLink .rel = "stylesheet"; 
// 	cssLink .type = "text/css"; 
// 	document.getElementById('sp-bot-iframe').contentDocument.head.appendChild(cssLink);
// }

document.addEventListener('DOMContentLoaded', function () {
   // if (window.location.hash == "#bot") {
        loadScript("https://cdn.botframework.com/botframework-webchat/latest/botchat.js", function () {
            prepareFrame();

        });

        sploadcss("sp-bot-chat-css", "https://cdn.botframework.com/botframework-webchat/latest/botchat.css");
        sploadcss("sp-bot-chat-main-css", botUrl + "css/style.css");
        renderIframeLauncher();
    //}
	
 }, false);


 function sploadcss(cssId, cssLink){
	if (!document.getElementById(cssId))
	{
		var head  = document.getElementsByTagName('head')[0];
		var link  = document.createElement('link');
		link.id   = cssId;
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.href = cssLink;
		link.media = 'all';
		head.appendChild(link);
	}
}

function loadScript( url, callback ) {
    var script = document.createElement("script");
	script.type = "text/javascript";
	if(script.readyState) {  //IE
	  script.onreadystatechange = function() {
		if ( script.readyState === "loaded" || script.readyState === "complete" ) {
		  script.onreadystatechange = null;
		  callback();
		}
	  };
	} else {  //Others
	  script.onload = function() {
		callback();
	  };
	}
  
	script.src = url;
	document.getElementsByTagName( "head" )[0].appendChild( script );
  }
  

