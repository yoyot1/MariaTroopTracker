// Nation definitions with their IDs and properties
export const nations = {
    'France': { id: 'france', imageName: 'france', setupModeLimit: 26, supplyTrains: ['B4', 'G4'] },
    'Bavaria': { id: 'bavaria', imageName: 'bavaria', supplyTrains: ['G4'] },
    'Austria': { id: 'austria', imageName: 'austria', setupModeLimit: 28, supplyTrains: ['C8', 'K1', 'K6'] },
    'Prussia': { id: 'prussia', imageName: 'prussia', setupModeLimit: 22, supplyTrains: ['K10', 'A11'] },
    'Pragmatic Army': { id: 'pragmatic', imageName: 'pragmatic', setupModeLimit: 14, supplyTrains: ['C9'] },
    'Saxony': { id: 'saxony', imageName: 'saxony', supplyTrains: ['H8'] }
};

// Related nations for each main selection
export const nationGroups = {
    'france': ['France', 'Bavaria'],
    'austria': ['Austria'],
    'prussia': ['Prussia', 'Saxony', 'Pragmatic Army']
};

// Generals for each nation with their ranks and initial troops
export const nationGenerals = {
    'France': [
        { name: 'Moritz v. Sachsen', rank: 1, troops: 7, startingPosition: 'A1' },
        { name: 'Belle-Isle', rank: 2, troops: 6, startingPosition: 'G5' },
        { name: 'Broglie', rank: 3, troops: 5, startingPosition: 'G3' },
        { name: 'Maillebois', rank: 4, startingPosition: 'A6' },
        { name: 'Noailles', rank: 5, startingPosition: 'D4' }
    ],
    'Bavaria': [
        { name: 'Törring', rank: 1, troops: 5, startingPosition: 'G3' }
    ],
    'Austria': [
        { name: 'Karl v. Lothringen', rank: 1, startingPosition: 'M4' },
        { name: 'Traun', rank: 2, startingPosition: 'M1' },
        { name: 'Khevenhüller', rank: 3, troops: 6, startingPosition: 'N1' },
        { name: 'Batthyány', rank: 4, troops: 2, startingPosition: 'N1' },
        { name: 'Neipperg', rank: 5, startingPosition: 'L6' },
        { name: 'Arenberg', rank: 6, troops: 4, startingPosition: 'C7' }
    ],
    'Prussia': [
        { name: 'Friedrich der Große', rank: 1, startingPosition: 'L9' },
        { name: 'Schwerin', rank: 2, startingPosition: 'L9' },
        { name: 'Erbprinz Leopold', rank: 3, troops: 4, startingPosition: 'K9' },
        { name: 'Der Alte Dessauer', rank: 4, troops: 6, startingPosition: 'K12' }
    ],
    'Pragmatic Army': [
        { name: 'George II', rank: 1, startingPosition: 'E11' },
        { name: 'Cumberland', rank: 2, startingPosition: 'E11' },
        { name: 'Earl of Stair', rank: 3, startingPosition: 'C10' }
    ],
    'Saxony': [
        { name: 'Rutowski', rank: 1, troops: 5, startingPosition: 'I8' }
    ]
};

// Helper functions for nation data
export function getNationId(nation) {
    return nations[nation]?.id || nation.toLowerCase();
}

export function getNationImageName(nation) {
    return nations[nation]?.imageName || nation.toLowerCase();
}

export function getNationSetupLimit(nation) {
    return nations[nation]?.setupModeLimit || 0;
}

export function getStartingTroops(nation) {
    return (nationGenerals[nation] || [])
        .reduce((sum, general) => sum + (general.troops || 0), 0);
} 