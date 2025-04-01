// Winter scoring functionality module

// Score limits for each nation
const SCORE_LIMITS = {
    france: 11,
    prussia: 13,
    austria: 8,
    pragmatic: 8
};

// Years available for winter scoring
const WINTER_YEARS = [1741, 1742, 1743, 1744];

export function initializeWinterScoring() {
    const winterContainer = document.createElement('div');
    winterContainer.className = 'winter-scoring';
    winterContainer.innerHTML = `
        <h2>Winter Scoring</h2>
        <div class="winter-years-buttons"></div>
        <div id="winterYears" style="display: none">
            <div id="winterScoreForm"></div>
        </div>
        <button class="view-final-scores" onclick="viewFinalScores()" id="viewScoresButton" style="display: none">View Final Scores</button>
    `;

    // Add the container to the page
    document.body.appendChild(winterContainer);

    // Hide if in setup mode
    if (document.body.classList.contains('setup-mode')) {
        winterContainer.style.display = 'none';
    }

    // Create year buttons
    const buttonsContainer = winterContainer.querySelector('.winter-years-buttons');
    const winterScores = JSON.parse(localStorage.getItem('winterScores') || '{}');

    WINTER_YEARS.forEach((year, index) => {
        const button = document.createElement('button');
        button.id = `yearBtn_${year}`;
        button.className = 'year-button';
        if (winterScores[year]) {
            button.classList.add('completed');
            button.disabled = true;
        } else if (index > 0 && !winterScores[WINTER_YEARS[index - 1]]) {
            button.disabled = true;
        }
        button.textContent = `Winter ${year}`;
        button.onclick = () => selectYear(year);
        buttonsContainer.appendChild(button);
    });

    // Show view scores button if all years are recorded
    const allYearsRecorded = WINTER_YEARS.every(year => winterScores[year]);
    const viewScoresButton = document.getElementById('viewScoresButton');
    if (allYearsRecorded) {
        viewScoresButton.style.display = 'block';
    }
}

export function selectYear(year) {
    // Hide all year divs
    document.getElementById('winterYears').style.display = 'block';
    
    // Clear any active buttons
    document.querySelectorAll('.year-button').forEach(btn => btn.classList.remove('active'));
    
    // Set this button as active
    const button = document.getElementById(`yearBtn_${year}`);
    button.classList.add('active');
    
    // Create the scoring form
    const formContainer = document.getElementById('winterScoreForm');
    formContainer.innerHTML = `
        <div class="winter-year">
            <h3>Winter ${year}</h3>
            <div class="winter-scores">
                <div class="score-input">
                    <label for="score_${year}_france">France:</label>
                    <input type="number" id="score_${year}_france" min="1" max="${SCORE_LIMITS.france}" onchange="validateWinterScores(${year})" onkeyup="validateWinterScores(${year})">
                </div>
                <div class="score-input">
                    <label for="score_${year}_prussia">Prussia:</label>
                    <input type="number" id="score_${year}_prussia" min="1" max="${SCORE_LIMITS.prussia}" onchange="validateWinterScores(${year})" onkeyup="validateWinterScores(${year})">
                </div>
                <div class="score-input">
                    <label for="score_${year}_austria">Austria:</label>
                    <input type="number" id="score_${year}_austria" min="1" max="${SCORE_LIMITS.austria}" onchange="validateWinterScores(${year})" onkeyup="validateWinterScores(${year})">
                </div>
                <div class="score-input">
                    <label for="score_${year}_pragmatic">Pragmatic Army:</label>
                    <input type="number" id="score_${year}_pragmatic" min="1" max="${SCORE_LIMITS.pragmatic}" onchange="validateWinterScores(${year})" onkeyup="validateWinterScores(${year})">
                </div>
            </div>
            <div class="winter-buttons">
                <button onclick="cancelWinterScoring()" class="cancel-button">Cancel</button>
                <button onclick="recordWinterScores(${year})" class="record-button" id="recordButton_${year}" disabled>Record Scores</button>
            </div>
        </div>
    `;

    // Initial validation
    validateWinterScores(year);
}

export function validateWinterScores(year) {
    const nations = ['france', 'prussia', 'austria', 'pragmatic'];
    const recordButton = document.getElementById(`recordButton_${year}`);
    
    // Check if all scores are valid
    const allScoresValid = nations.every(nation => {
        const scoreInput = document.getElementById(`score_${year}_${nation}`);
        const score = scoreInput.value;
        
        if (!score) return false;
        
        const numScore = parseInt(score);
        return numScore >= 1 && numScore <= SCORE_LIMITS[nation];
    });

    // Enable/disable record button based on validation
    recordButton.disabled = !allScoresValid;
}

// Make validateWinterScores available globally
window.validateWinterScores = validateWinterScores;

export function cancelWinterScoring() {
    // Clear any active buttons
    document.querySelectorAll('.year-button').forEach(btn => btn.classList.remove('active'));
    
    // Hide the scoring interface
    document.getElementById('winterYears').style.display = 'none';
}

// Make cancelWinterScoring available globally
window.cancelWinterScoring = cancelWinterScoring;

export function recordWinterScores(year) {
    const nations = ['france', 'prussia', 'austria', 'pragmatic'];
    const scores = {};
    
    // Validate all scores are entered and within limits
    let allScoresValid = true;
    let errorMessage = '';
    
    nations.forEach(nation => {
        const scoreInput = document.getElementById(`score_${year}_${nation}`);
        const score = scoreInput.value;
        
        if (!score) {
            allScoresValid = false;
            errorMessage = 'Please enter scores for all nations';
            return;
        }
        
        const numScore = parseInt(score);
        if (numScore < 1 || numScore > SCORE_LIMITS[nation]) {
            allScoresValid = false;
            const nationName = nation.charAt(0).toUpperCase() + nation.slice(1);
            const displayName = nationName === 'Pragmatic' ? 'Pragmatic Army' : nationName;
            errorMessage = `${displayName} score must be between 1 and ${SCORE_LIMITS[nation]} (a score of 0 means the game is already over)`;
            return;
        }
        
        scores[nation] = numScore;
    });

    if (!allScoresValid) {
        alert(errorMessage);
        return;
    }

    // Store scores
    const winterScores = JSON.parse(localStorage.getItem('winterScores') || '{}');
    winterScores[year] = scores;
    localStorage.setItem('winterScores', JSON.stringify(winterScores));

    // Update button states
    const currentButton = document.getElementById(`yearBtn_${year}`);
    currentButton.classList.remove('active');
    currentButton.classList.add('completed');
    currentButton.disabled = true;

    // Enable next year's button if available
    const currentIndex = WINTER_YEARS.indexOf(year);
    if (currentIndex < WINTER_YEARS.length - 1) {
        const nextButton = document.getElementById(`yearBtn_${WINTER_YEARS[currentIndex + 1]}`);
        nextButton.disabled = false;
    }

    // Hide the scoring interface
    document.getElementById('winterYears').style.display = 'none';

    // Check if all years are recorded and show view scores button if they are
    const allYearsRecorded = WINTER_YEARS.every(y => winterScores[y]);
    if (allYearsRecorded) {
        document.getElementById('viewScoresButton').style.display = 'block';
    }
}

export function viewFinalScores() {
    const winterScores = JSON.parse(localStorage.getItem('winterScores') || '{}');
    const nations = ['france', 'prussia', 'austria', 'pragmatic'];
    
    // Calculate totals
    const totals = {};
    nations.forEach(nation => {
        totals[nation] = WINTER_YEARS.reduce((sum, year) => sum + (winterScores[year]?.[nation] || 0), 0);
    });

    // Find the winner (lowest total)
    const winningTotal = Math.min(...Object.values(totals));
    const winners = Object.entries(totals)
        .filter(([_, total]) => total === winningTotal)
        .map(([nation, _]) => nation);

    // Create table HTML
    let tableHtml = '<div class="scores-summary">';
    
    // Add title
    tableHtml += '<h2>Winter Scoring Summary</h2>';
    
    // Create the table
    tableHtml += `
        <table class="scores-table">
            <tr>
                <th>Nation</th>
                ${WINTER_YEARS.map(year => 
                    `<th>${year}</th>`
                ).join('')}
                <th>Total</th>
            </tr>
    `;

    // Add rows for each nation
    nations.forEach(nation => {
        const isWinner = winners.includes(nation);
        const nationName = nation.charAt(0).toUpperCase() + nation.slice(1);
        const displayName = nationName === 'Pragmatic' ? 'Pragmatic Army' : nationName;
        
        tableHtml += `
            <tr${isWinner ? ' class="winner"' : ''}>
                <td>${displayName}</td>
                ${WINTER_YEARS.map(year => 
                    `<td>${winterScores[year]?.[nation] || '-'}</td>`
                ).join('')}
                <td>${totals[nation]}</td>
            </tr>
        `;
    });

    tableHtml += '</table>';

    // Add winner announcement
    if (winners.length > 0) {
        const winnerNames = winners.map(nation => {
            const nationName = nation.charAt(0).toUpperCase() + nation.slice(1);
            return nationName === 'Pragmatic' ? 'Pragmatic Army' : nationName;
        });
        
        const winnerText = winners.length > 1 
            ? `Tie between ${winnerNames.join(' and ')}` 
            : `${winnerNames[0]} wins`;
            
        tableHtml += `
            <div class="winner-announcement">
                ${winnerText} with ${winningTotal} points!
            </div>
        `;
    }

    tableHtml += '</div>';

    // Create a modal dialog for the table
    const modalHtml = `
        <div id="scoresModal" class="scores-modal">
            <div class="scores-modal-content">
                <button onclick="document.getElementById('scoresModal').remove()" class="scores-modal-close">Close</button>
                ${tableHtml}
            </div>
        </div>
    `;

    // Add the modal to the page
    document.body.insertAdjacentHTML('beforeend', modalHtml);
} 
