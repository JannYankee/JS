
document.querySelectorAll('#links a').forEach(a => {
    if (a.href.startsWith('http')) {
        a.classList.add('external');
    }
});


document.querySelectorAll('#tree li > span').forEach(span => {
    span.addEventListener('click', () => {
        const next = span.nextElementSibling;
        if (next && next.tagName === 'UL') {
            next.style.display = next.style.display === 'block' ? 'none' : 'block';
        }
    });
});


const list = document.getElementById('bookList');
let lastSelectedIndex = -1;

list.addEventListener('click', (e) => {
    if (e.target.tagName !== 'LI') return;

    const items = [...list.children];
    const index = items.indexOf(e.target);

    if (e.ctrlKey) {
        e.target.classList.toggle('selected');
    } else if (e.shiftKey && lastSelectedIndex >= 0) {
        const [start, end] = [lastSelectedIndex, index].sort((a, b) => a - b);
        items.slice(start, end + 1).forEach(li => li.classList.add('selected'));
    } else {
        items.forEach(li => li.classList.remove('selected'));
        e.target.classList.add('selected');
    }

    lastSelectedIndex = index;
});


document.querySelectorAll('#sortable th').forEach((th, colIdx) => {
    th.addEventListener('click', () => {
        const tbody = th.closest('table').querySelector('tbody');
        const rows = Array.from(tbody.rows);
        const type = th.dataset.type || 'string';

        rows.sort((a, b) => {
            const aText = a.cells[colIdx].textContent.trim();
            const bText = b.cells[colIdx].textContent.trim();
            if (type === 'number') return aText - bText;
            return aText.localeCompare(bText);
        });

        tbody.replaceChildren(...rows);
    });
});
