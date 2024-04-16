document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.morse-code-card, .morsemenu-char-card, .playcharsound').forEach(function(card) {
        const audioUrl = card.getAttribute('data-audio-url');
        const audio = new Audio(audioUrl);

        card.addEventListener('click', function() {
            audio.play().catch(e => console.error('Error playing audio:', e));
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const pathFromStart = {
        'nodeE': ['path-start-nodeE'],
        'nodeT': ['path-start-nodeT'],
        'nodeI': ['path-start-nodeE','path-nodeE-nodeI'],
        'nodeA': ['path-start-nodeE','path-nodeE-nodeA'],
        'nodeN': ['path-start-nodeT','path-nodeT-nodeN'],
        'nodeM': ['path-start-nodeT','path-nodeT-nodeM'],
        'nodeS': ['path-start-nodeE','path-nodeE-nodeI','path-nodeI-nodeS'],
        'nodeU': ['path-start-nodeE','path-nodeE-nodeI','path-nodeI-nodeU'],
        'nodeR': ['path-start-nodeE','path-nodeE-nodeA','path-nodeA-nodeR'],
        'nodeW': ['path-start-nodeE','path-nodeE-nodeA','path-nodeA-nodeW'],
        'nodeD': ['path-start-nodeT','path-nodeT-nodeN','path-nodeN-nodeD'],
        'nodeK': ['path-start-nodeT','path-nodeT-nodeN','path-nodeN-nodeK'],
        'nodeG': ['path-start-nodeT','path-nodeT-nodeM','path-nodeM-nodeG'],
        'nodeO': ['path-start-nodeT','path-nodeT-nodeM','path-nodeM-nodeO'],
        'nodeH': ['path-start-nodeE','path-nodeE-nodeI','path-nodeI-nodeS','path-nodeS-nodeH'],
        'nodeV': ['path-start-nodeE','path-nodeE-nodeI','path-nodeI-nodeS','path-nodeS-nodeV'],
        'nodeF': ['path-start-nodeE','path-nodeE-nodeI','path-nodeI-nodeU','path-nodeU-nodeF'],
        'nodeL': ['path-start-nodeE','path-nodeE-nodeA','path-nodeA-nodeR','path-nodeR-nodeL'],
        'nodeP': ['path-start-nodeE','path-nodeE-nodeA','path-nodeA-nodeW','path-nodeW-nodeP'],
        'nodeJ': ['path-start-nodeE','path-nodeE-nodeA','path-nodeA-nodeW','path-nodeW-nodeJ'],
        'nodeB': ['path-start-nodeT','path-nodeT-nodeN','path-nodeN-nodeD','path-nodeD-nodeB'],
        'nodeX': ['path-start-nodeT','path-nodeT-nodeN','path-nodeN-nodeD','path-nodeD-nodeX'],
        'nodeC': ['path-start-nodeT','path-nodeT-nodeN','path-nodeN-nodeK','path-nodeK-nodeC'],
        'nodeY': ['path-start-nodeT','path-nodeT-nodeN','path-nodeN-nodeK','path-nodeK-nodeY'],
        'nodeZ': ['path-start-nodeT','path-nodeT-nodeM','path-nodeM-nodeG','path-nodeG-nodeZ'],
        'nodeQ': ['path-start-nodeT','path-nodeT-nodeM','path-nodeM-nodeG','path-nodeG-nodeQ'],
    };
    const nodes = document.querySelectorAll('circle');
    nodes.forEach(node => {
        node.addEventListener('click', function() {
            resetHighlights();
            const nodeId = this.id;
            if(nodeId in pathFromStart) {
                this.style.fill = 'red';
                const paths = pathFromStart[nodeId];
                paths.forEach(pathId => {
                    const path = document.getElementById(pathId);
                    const pathClass = path.getAttribute('class');
                    const textContent = pathClass.includes('dot') ? '.' : '-';

                    displayTextOverPath(path, textContent);
                    
                    path.style.stroke = 'red'; 
                    const audioUrl = `static/audios/Morse-${nodeId.slice(4)}.mp3`;
                    const audio = new Audio(audioUrl);
                    audio.play().catch(e => console.error('Error playing audio:', e));

                });
            }

            setTimeout(resetHighlights, 2000);
        });
    });

    function displayTextOverPath(path, textContent) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const bbox = path.getBBox(); 
        text.setAttribute("x", bbox.x + bbox.width / 2); 
        text.setAttribute("y", bbox.y + bbox.height / 2);
        text.setAttribute("style", "fill: red; font-size: 50px; text-anchor: middle; font-weight: bold !important;");
        text.textContent = textContent;
        path.parentNode.insertBefore(text, path.nextSibling); 
    }

    function resetHighlights() {
        document.querySelectorAll('circle').forEach(n => n.style.fill = '');
        document.querySelectorAll('path').forEach(p => p.style.stroke = '#000');
        document.querySelectorAll('svg text:not([id])').forEach(t => t.remove());
    }
});