document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.morse-code-card, .morsemenu-char-card, .playcharsound').forEach(function(card) {
        const audioUrl = card.getAttribute('data-audio-url');
        const audio = new Audio(audioUrl);

        card.addEventListener('click', function() {
            audio.play().catch(e => console.error('Error playing audio:', e));
        });
    });
});
