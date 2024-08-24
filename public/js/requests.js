document.addEventListener('DOMContentLoaded', async function() {
	const searchInput = document.getElementById('search');
    const tbody = document.querySelector('#requestsTable');
    let requests = [];

	async function fetchRequests() {
        try {
            const response = await fetch('/api/requests', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                requests = await response.json();
                displayRequests(requests);
            } else {
                const error = await response.json();
                alert(`Ошибка: ${error.error}`);
            }
        } catch (error) {
            alert(`Ошибка: ${error.message}`);
        }
    }

	function displayRequests(data) {
        tbody.innerHTML = '';
        data.forEach(request => {
            const tr = document.createElement('tr');
            tr.classList.add('border-b', 'border-gray-200', 'hover:bg-gray-100');
            tr.innerHTML = `
                <td class="py-3 px-6 text-left whitespace-nowrap">${request.fullName}</td>
                <td class="py-3 px-6 text-left">${request.phone}</td>
                <td class="py-3 px-6 text-left">${request.problemDescription}</td>
                <td class="py-3 px-6 text-left">${new Date(request.createdAt).toLocaleString()}</td>
            `;
            tbody.appendChild(tr);
        });
    }

	function filterRequests(query) {
        const filtered = requests.filter(request =>
            request.fullName.toLowerCase().includes(query.toLowerCase()) ||
            request.phone.includes(query)
        );
        displayRequests(filtered);
    }

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value;
        filterRequests(query);
    });

    fetchRequests();
});
