function comentar(){
	comentario = document.getElementById('escritura').value;
	chat = document.getElementById('chat')
	chat.innerHTML += (comentario + "<br>");
	chat.scrollTop = chat.scrollHeight;
}
