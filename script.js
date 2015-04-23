function comentar(){
	comentario = document.getElementById('escritura');
	chat = document.getElementById('chat')
	chat.innerHTML += (comentario.value + "<br>");
	chat.scrollTop = chat.scrollHeight;
	comentario.value = '';
}
