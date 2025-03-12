// Nation definitions with their IDs and properties
export const nations = {
    'France': { id: 'france', imageName: 'france' },
    'Bavaria': { id: 'bavaria', imageName: 'bavaria' },
    'Austria': { id: 'austria', imageName: 'austria' },
    'Prussia': { id: 'prussia', imageName: 'prussia' },
    'Pragmatic Army': { id: 'pragmatic', imageName: 'pragmatic' },
    'Saxony': { id: 'saxony', imageName: 'saxony' }
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
        { name: 'Moritz v. Sachsen', rank: 1, troops: 7 },
        { name: 'Belle-Isle', rank: 2, troops: 6 },
        { name: 'Broglie', rank: 3, troops: 5 },
        { name: 'Maillebois', rank: 4 },
        { name: 'Noailles', rank: 5 }
    ],
    'Bavaria': [
        { name: 'Törring', rank: 1, troops: 5 }
    ],
    'Austria': [
        { name: 'Karl v. Lothringen', rank: 1 },
        { name: 'Traun', rank: 2 },
        { name: 'Khevenhüller', rank: 3, troops: 6 },
        { name: 'Batthyány', rank: 4, troops: 2 },
        { name: 'Neipperg', rank: 5 },
        { name: 'Arenberg', rank: 6, troops: 4 }
    ],
    'Prussia': [
        { name: 'Friedrich der Große', rank: 1 },
        { name: 'Schwerin', rank: 2 },
        { name: 'Erbprinz Leopold', rank: 3, troops: 4 },
        { name: 'Der Alte Dessauer', rank: 4, troops: 6 }
    ],
    'Pragmatic Army': [
        { name: 'George II', rank: 1 },
        { name: 'Cumberland', rank: 2 },
        { name: 'Earl of Stair', rank: 3 }
    ],
    'Saxony': [
        { name: 'Rutowski', rank: 1, troops: 5 }
    ]
};

// Helper functions for nation data
export function getNationId(nation) {
    return nations[nation]?.id || nation.toLowerCase();
}

export function getNationImageName(nation) {
    return nations[nation]?.imageName || nation.toLowerCase();
} 