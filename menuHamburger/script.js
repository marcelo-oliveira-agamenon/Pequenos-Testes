var menuToggle = document.querySelector('#menu-toggle');
var activeElements = document.querySelectorAll('.active-element');
var toggledMenu = menuToggle.addEventListener('click', function() {
	activeElements.forEach(function(e) {
		e.classList.toggle('active');
	})
});