# Testing Guide

This project uses [Vitest](https://vitest.dev/) as the testing framework along with [React Testing Library](https://testing-library.com/react) for component testing.

## Running Tests

### Install Dependencies

First, make sure all testing dependencies are installed:

```bash
yarn install
```

### Run Tests

```bash
# Run all tests once
yarn test

# Run tests in watch mode (recommended during development)
yarn test --watch

# Run tests with UI interface
yarn test:ui

# Run tests with coverage report
yarn test:coverage
```

## Test Files

### Game Logic Tests (`src/utils/crapsGame.test.ts`)

Comprehensive tests for the core game logic including:

- **`rollDice()`**: Tests dice rolling randomness and validation
- **`playRound()`**: Tests individual game rounds including:
  - Immediate wins (rolling 7 or 11)
  - Immediate losses (rolling 2, 3, or 12)
  - Point-based gameplay
  - Edge cases and error handling
- **`validateGameParams()`**: Tests parameter validation for:
  - Bankroll validation (5-1000 range)
  - Bet validation (5 to bankroll range)
  - Number of plays validation (1-100 range)
  - Boundary conditions
  - Multiple error scenarios
- **`playGame()`**: Tests complete game flow including:
  - Bankroll management
  - Multiple rounds
  - Game ending conditions
  - Win/loss calculations
  - Game logging

### Component Tests (`src/components/GameControls.test.tsx`)

Tests for the GameControls form component including:

- **Form Rendering**: Ensures all inputs and labels are present
- **Input Validation**: Tests validation for all three inputs
- **Error Display**: Tests error message display and timing
- **Form Submission**: Tests successful and failed submissions
- **Accessibility**: Tests ARIA attributes and keyboard navigation
- **User Interactions**: Tests typing, clearing, and blur events
- **Boundary Values**: Tests min/max values for all inputs
- **Disabled State**: Tests component behavior when disabled

## Test Coverage

To generate a coverage report:

```bash
yarn test:coverage
```

This will create:

- A text summary in the terminal
- An HTML report in `coverage/index.html`
- A JSON report in `coverage/coverage-final.json`

## Testing Best Practices

### What's Tested

✅ Core game logic functions  
✅ Input validation  
✅ Edge cases and boundary conditions  
✅ Error handling  
✅ Component rendering and user interactions  
✅ Accessibility features

### What's Not Tested

❌ Styled components (visual styling)  
❌ Configuration files  
❌ Build outputs

## Writing New Tests

When adding new features, follow these patterns:

### For Game Logic

```typescript
import { describe, it, expect, vi } from "vitest";

describe("myFunction", () => {
  it("should do something specific", () => {
    // Arrange
    const input = {
      /* ... */
    };

    // Act
    const result = myFunction(input);

    // Assert
    expect(result).toBe(expectedValue);
  });
});
```

### For Components

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("MyComponent", () => {
  it("should render correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });

  it("should handle user interaction", async () => {
    const user = userEvent.setup();
    render(<MyComponent />);

    await user.click(screen.getByRole("button"));
    expect(/* assertion */).toBe(true);
  });
});
```

## Continuous Integration

Tests are automatically run in the GitHub Actions CI/CD pipeline before every deployment to GitHub Pages. This ensures that only passing code is deployed to production.

The workflow (`.github/workflows/deploy.yml`) runs tests after installing dependencies and before building:

```yaml
- name: Install dependencies
  run: yarn install --frozen-lockfile

- name: Run tests
  run: yarn test

- name: Build
  run: yarn build
```

If tests fail, the deployment will be blocked and you'll see the failure in the GitHub Actions tab.

## Troubleshooting

### Tests are failing after installation

1. Make sure all dependencies are installed: `yarn install`
2. Clear the Vitest cache: `yarn vitest --clearCache`
3. Check Node.js version compatibility

### Mock functions aren't working

- Always restore mocks after each test:
  ```typescript
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  ```

### Coverage is lower than expected

- Check the coverage report HTML for detailed file-by-file breakdown
- Note that styled components are excluded from coverage
- Ensure test files are named with `.test.ts` or `.test.tsx` extension

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library Documentation](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
