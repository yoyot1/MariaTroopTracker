# Maria Board Game Troop Tracker

A web-based tool for tracking troops and calculating battle strength in the Maria board game.

## Features

- Track troops for each general across all nations
- Calculate battle strength for selected generals
- Setup mode for initial troop distribution
- Winter scoring tracking
- Saxony allegiance management
- Mobile-responsive design

## Usage

### Starting a New Game

1. Open `index.html` in your web browser
2. Select your main nation (France, Austria, or Prussia)
3. The tracker will show all relevant nations and their generals

### Setup Mode

1. Click "Enter Setup Mode" to begin initial troop distribution
2. Each nation has a specific number of troops to distribute:
   - France: 26 troops
   - Austria: 28 troops
   - Prussia: 22 troops
   - Pragmatic Army: 14 troops
   - Bavaria and Saxony: Fixed at 5 troops each (cannot be modified)
3. Use the + and - buttons to adjust troop numbers for each general
4. You cannot:
   - Decrease troops below starting values
   - Exceed the nation's total troop limit
   - Modify Bavaria or Saxony's troops
5. Click "Exit Setup Mode" when finished
   - A warning will appear if any generals have zero troops or if any nation has unused troops
   - You can still exit after confirming

### Regular Game Play

1. Use the + and - buttons to adjust troop numbers as they change during the game
2. Select generals for battle by checking their checkboxes
3. Click "View Battle Strength" to calculate and display the battle strength
4. Select a supreme commander if multiple generals have the same rank

### Saxony Management

- When playing as Prussia:
  - Use the "Remove Saxony" button to switch Saxony to Austria
  - Use the "Add Saxony" button to switch Saxony back to Prussia
- When playing as Austria:
  - Use the "Add Saxony" button to switch Saxony to Austria
  - Use the "Remove Saxony" button to switch Saxony back to Prussia

### Winter Scoring

1. Click on a year button to record winter scores
2. Enter scores for each nation
3. Click "Record Scores" to save
4. Once all years are scored, click "View Final Scores" to see the results

## Technical Details

- The app uses localStorage to save game state
- No server required - works entirely in the browser
- Mobile-responsive design for use on phones and tablets
- Works offline once loaded

## Browser Support

- Chrome
- Firefox
- Safari
- Edge
