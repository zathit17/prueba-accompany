document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('screen-action-btn');
    const log = document.getElementById('output-log');

    if (btn && log) {
        btn.addEventListener('click', () => {
            const timestamp = new Date().toLocaleTimeString();
            log.innerHTML = `> Acción ejecutada a las ${timestamp}<br>` + log.innerHTML;

            // Simple visual feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 100);
        });
    }
});
