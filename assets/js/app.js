document.addEventListener('DOMContentLoaded', () => {
    const ctaBtn = document.getElementById('ctaBtn');
    const ctaMessage = document.getElementById('ctaMessage');

    if (!ctaBtn || !ctaMessage) return;

    ctaBtn.addEventListener('click', () => {
        ctaMessage.textContent = 'Great! Your PHP + Bootstrap page is ready to customize.';
    });
});
