document.getElementById('userForm').addEventListener('submit', async function (event) {
	event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

	const nombre = document.getElementById('nombre').value;
	const email = document.getElementById('email').value;
	const mensaje = document.getElementById('mensaje').value; // Obtener el mensaje

	try {
		const response = await fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ nombre, email, mensaje }) // Incluir mensaje en el cuerpo
		});

		const data = await response.json();
		if (response.ok) {
			alert('Usuario creado con ID: ' + data.userId);
			document.getElementById('userForm').reset(); // Resetear el formulario
		} else {
			alert('Error: ' + data.message);
		}
	} catch (error) {
		alert('Error de red: ' + error);
	}
});
