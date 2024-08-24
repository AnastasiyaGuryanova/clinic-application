document.getElementById('requestForm').addEventListener('submit', async function(e) {
    e.preventDefault();

	const phone = document.getElementById('phone').value.replace(/\D/g, '');
    if (phone.length !== 11) {
        alert('Введите полный номер телефона, включая код страны.');
        return;
    }

    const data = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        problemDescription: document.getElementById('problemDescription').value,
    };

    try {
        const response = await fetch('/api/requests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Запрос успешно отправлен!');

            document.getElementById('requestForm').reset();
        } else {
            const error = await response.json();
            alert(`Ошибка: ${error.error}`);
        }
    } catch (error) {
        alert(`Ошибка: ${error.message}`);
    }
});

document.getElementById('phone').addEventListener('input', function(e) {
    let input = e.target.value.replace(/\D/g, '');
    let formattedInput = '';

    if (input.length > 0) {
        formattedInput += '+' + input.substring(0, 1);
    }
    if (input.length > 1) {
        formattedInput += ' (' + input.substring(1, 4);
    }
    if (input.length > 4) {
        formattedInput += ') ' + input.substring(4, 7);
    }
    if (input.length > 7) {
        formattedInput += '-' + input.substring(7, 9);
    }
    if (input.length > 9) {
        formattedInput += '-' + input.substring(9, 11);
    }

    e.target.value = formattedInput;
});
