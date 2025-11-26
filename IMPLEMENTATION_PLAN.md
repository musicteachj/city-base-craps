# Craps Game Take-Home Assignment - Implementation Plan

## Overview

Convert the React skeleton to TypeScript and implement a fully functional craps game with UI, form validation, and GitHub Pages deployment.

---

## 1. TypeScript Migration

Convert the existing React/JavaScript project to TypeScript:

- Add TypeScript dependencies (`typescript`, `@types/styled-components`)
- Create `tsconfig.json` with proper React + Vite configuration
- Rename all `.js`/`.jsx` files to `.ts`/`.tsx`
- Add proper type definitions for all components and functions
- Update `vite.config.js` to `vite.config.ts`

Key files to convert:

- `src/main.jsx` → `src/main.tsx`
- `src/App.jsx` → `src/App.tsx`
- `src/components/Dice.jsx` → `src/components/Dice.tsx`
- All styled-component files to `.ts`

## 2. Implement Core Game Logic

Build the craps game engine following the 4 steps from README:

### Step 1-2: Basic game logic

- Create `src/utils/crapsGame.ts` with core game functions
- Implement dice rolling (2d6)
- Implement first round logic (win on 7/11, lose on 2/3/12, set point otherwise)
- Implement second round logic (match point to win, roll 7 to lose)
- Support multiple plays

### Step 3: Bankroll management

- Add bankroll tracking
- Deduct bet before each game
- Add winnings after each game
- End game when bankroll < bet or plays exhausted

### Step 4: Create types

- Define TypeScript interfaces for game state, roll results, game logs

## 3. Build UI Components

Create a functional, accessible UI:

### Form Component (`src/components/GameControls.tsx`)

- Input for bankroll (5-1000, inclusive)
- Input for bet (5 to current bankroll, inclusive)
- Input for number of plays (1-100, inclusive)
- Validation with clear error messages
- Start game button (disabled when inputs invalid)
- Proper labels and WCAG accessibility attributes

### Game Display Component (`src/components/GameDisplay.tsx`)

- Show current bankroll status
- Display game log (rolls, point values, wins/losses)
- Show final results (total won/lost)
- Use existing `Dice` component to visually display dice values
- Clear separation between rounds

### Main App (`src/App.tsx`)

- Coordinate game controls and display
- Manage game state
- Handle game execution flow

## 4. Styling with Styled-Components

Create clean, professional styling:

- Use existing `App.styled.js` and `Dice.styled.js` as foundation
- Create styled components for form inputs with proper error states
- Create styled components for game log display
- Ensure responsive design for mobile, tablet, and desktop devices
- Use flexible layouts and media queries for optimal viewing on all screen sizes
- Maintain casino/game aesthetic with the existing blue theme

## 5. GitHub Pages Deployment

Set up automated deployment:

- Update `vite.config.ts` with proper `base` path for GitHub Pages
- Create `.github/workflows/deploy.yml` for GitHub Actions
- Configure workflow to build and deploy on push to main/master
- Add deployment script to `package.json`
- Update `README.md` with live demo link placeholder

## 6. Final Polish

- Add proper error handling throughout
- Ensure all TypeScript types are properly defined (no `any` types)
- Verify WCAG accessibility (proper labels, keyboard navigation, error messages)
- Test edge cases (bankroll depletion, max values, etc.)
- Test responsive behavior on mobile, tablet, and desktop viewports
- Clean, well-commented code
- Verify build works (`yarn build`)

## 7. Bonus Steps (Optional - After Core Implementation)

After completing the core requirements and final polish, attempt the following bonus features:

### Animated Dice

- Implement CSS animations for the dice component
- Animate dice to display rolled values with visual rolling effect
- Ensure animations are smooth and enhance user experience

### Unit Tests

- Add testing framework (e.g., Vitest or Jest)
- Write unit tests for game logic functions
- Test form validation logic
- Test edge cases and error handling

### TypeScript (Already Complete)

- This bonus is already satisfied through the TypeScript migration in Step 1

---

## Key Technical Decisions

- **TypeScript**: Strict mode enabled for type safety
- **State Management**: React useState hooks (no external state library needed)
- **Styling**: styled-components only, no CSS frameworks
- **Accessibility**: Semantic HTML, ARIA labels, keyboard support
- **Deployment**: GitHub Actions with automated build/deploy to gh-pages branch

---

## Implementation Checklist

### Core Requirements

- [ ] Set up TypeScript configuration and dependencies
- [ ] Convert all JS/JSX files to TS/TSX with proper types
- [ ] Implement core craps game logic with all 4 steps
- [ ] Build GameControls component with validation
- [ ] Build GameDisplay component with dice visualization
- [ ] Integrate components in main App with state management
- [ ] Complete styling for all components with styled-components
- [ ] Set up GitHub Actions workflow for GitHub Pages deployment
- [ ] Test all functionality and add final polish

### Bonus Features (Optional)

- [ ] Implement animated dice with visual rolling effects
- [ ] Add unit tests for game logic and components

## 🎲 Live Demo

**[Play the Game Here](https://musicteachj.github.io/city-base-craps/)**
