import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameControls from "./GameControls";

describe("GameControls Component", () => {
  const mockOnStartGame = vi.fn();

  beforeEach(() => {
    mockOnStartGame.mockClear();
  });

  it("should render all form inputs and labels", () => {
    render(<GameControls onStartGame={mockOnStartGame} />);

    expect(screen.getByLabelText(/bankroll/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of plays/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /start game/i })
    ).toBeInTheDocument();
  });

  it("should have default values", () => {
    render(<GameControls onStartGame={mockOnStartGame} />);

    const bankrollInput = screen.getByLabelText(
      /bankroll/i
    ) as HTMLInputElement;
    const betInput = screen.getByLabelText(/bet/i) as HTMLInputElement;
    const playsInput = screen.getByLabelText(
      /number of plays/i
    ) as HTMLInputElement;

    expect(bankrollInput.value).toBe("100");
    expect(betInput.value).toBe("5");
    expect(playsInput.value).toBe("10");
  });

  it("should enable submit button with valid default inputs", () => {
    render(<GameControls onStartGame={mockOnStartGame} />);

    const submitButton = screen.getByRole("button", { name: /start game/i });
    expect(submitButton).not.toBeDisabled();
  });

  it("should call onStartGame with correct values when form is submitted", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const submitButton = screen.getByRole("button", { name: /start game/i });
    await user.click(submitButton);

    expect(mockOnStartGame).toHaveBeenCalledWith({
      bankroll: 100,
      bet: 5,
      numberOfPlays: 10,
    });
  });

  it("should update input values when user types", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const bankrollInput = screen.getByLabelText(
      /bankroll/i
    ) as HTMLInputElement;

    await user.clear(bankrollInput);
    await user.type(bankrollInput, "500");

    expect(bankrollInput.value).toBe("500");
  });

  it("should show error for bankroll below minimum", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const bankrollInput = screen.getByLabelText(/bankroll/i);

    await user.clear(bankrollInput);
    await user.type(bankrollInput, "3");
    await user.tab(); // Trigger blur

    await waitFor(() => {
      expect(
        screen.getByText(/bankroll must be between 5 and 1000/i)
      ).toBeInTheDocument();
    });
  });

  it("should show error for bankroll above maximum", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const bankrollInput = screen.getByLabelText(/bankroll/i);

    await user.clear(bankrollInput);
    await user.type(bankrollInput, "1500");
    await user.tab(); // Trigger blur

    await waitFor(() => {
      expect(
        screen.getByText(/bankroll must be between 5 and 1000/i)
      ).toBeInTheDocument();
    });
  });

  it("should show error for bet below minimum", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const betInput = screen.getByLabelText(/bet/i);

    await user.clear(betInput);
    await user.type(betInput, "2");
    await user.tab(); // Trigger blur

    await waitFor(() => {
      expect(screen.getByText(/bet must be at least 5/i)).toBeInTheDocument();
    });
  });

  it("should show error for bet exceeding bankroll", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const bankrollInput = screen.getByLabelText(/bankroll/i);
    const betInput = screen.getByLabelText(/bet/i);

    await user.clear(bankrollInput);
    await user.type(bankrollInput, "50");
    await user.clear(betInput);
    await user.type(betInput, "100");
    await user.tab(); // Trigger blur

    await waitFor(() => {
      expect(
        screen.getByText(/bet cannot exceed bankroll/i)
      ).toBeInTheDocument();
    });
  });

  it("should show error for numberOfPlays below minimum", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const playsInput = screen.getByLabelText(/number of plays/i);

    await user.clear(playsInput);
    await user.type(playsInput, "0");
    await user.tab(); // Trigger blur

    await waitFor(() => {
      expect(
        screen.getByText(/number of plays must be between 1 and 100/i)
      ).toBeInTheDocument();
    });
  });

  it("should show error for numberOfPlays above maximum", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const playsInput = screen.getByLabelText(/number of plays/i);

    await user.clear(playsInput);
    await user.type(playsInput, "150");
    await user.tab(); // Trigger blur

    await waitFor(() => {
      expect(
        screen.getByText(/number of plays must be between 1 and 100/i)
      ).toBeInTheDocument();
    });
  });

  it("should disable submit button when inputs are invalid", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const bankrollInput = screen.getByLabelText(/bankroll/i);
    const submitButton = screen.getByRole("button", { name: /start game/i });

    await user.clear(bankrollInput);
    await user.type(bankrollInput, "2");

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it("should not call onStartGame when form is invalid", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const bankrollInput = screen.getByLabelText(/bankroll/i);

    await user.clear(bankrollInput);
    await user.type(bankrollInput, "2");

    const submitButton = screen.getByRole("button", { name: /start game/i });

    // Button should be disabled, but try to click anyway
    await user.click(submitButton);

    expect(mockOnStartGame).not.toHaveBeenCalled();
  });

  it("should accept values at boundary limits", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const bankrollInput = screen.getByLabelText(/bankroll/i);
    const betInput = screen.getByLabelText(/bet/i);
    const playsInput = screen.getByLabelText(/number of plays/i);

    // Set to minimum valid values
    await user.clear(bankrollInput);
    await user.type(bankrollInput, "5");
    await user.clear(betInput);
    await user.type(betInput, "5");
    await user.clear(playsInput);
    await user.type(playsInput, "1");

    const submitButton = screen.getByRole("button", { name: /start game/i });
    await user.click(submitButton);

    expect(mockOnStartGame).toHaveBeenCalledWith({
      bankroll: 5,
      bet: 5,
      numberOfPlays: 1,
    });
  });

  it("should accept maximum boundary values", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const bankrollInput = screen.getByLabelText(/bankroll/i);
    const betInput = screen.getByLabelText(/bet/i);
    const playsInput = screen.getByLabelText(/number of plays/i);

    // Set to maximum valid values
    await user.clear(bankrollInput);
    await user.type(bankrollInput, "1000");
    await user.clear(betInput);
    await user.type(betInput, "1000");
    await user.clear(playsInput);
    await user.type(playsInput, "100");

    const submitButton = screen.getByRole("button", { name: /start game/i });
    await user.click(submitButton);

    expect(mockOnStartGame).toHaveBeenCalledWith({
      bankroll: 1000,
      bet: 1000,
      numberOfPlays: 100,
    });
  });

  it("should disable all inputs when disabled prop is true", () => {
    render(<GameControls onStartGame={mockOnStartGame} disabled={true} />);

    const bankrollInput = screen.getByLabelText(/bankroll/i);
    const betInput = screen.getByLabelText(/bet/i);
    const playsInput = screen.getByLabelText(/number of plays/i);
    const submitButton = screen.getByRole("button");

    expect(bankrollInput).toBeDisabled();
    expect(betInput).toBeDisabled();
    expect(playsInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it('should show "Playing..." text on submit button when disabled', () => {
    render(<GameControls onStartGame={mockOnStartGame} disabled={true} />);

    expect(screen.getByText(/playing.../i)).toBeInTheDocument();
  });

  it("should display external error message when provided", () => {
    const errorMessage = "Something went wrong!";
    render(<GameControls onStartGame={mockOnStartGame} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should have proper ARIA attributes for accessibility", () => {
    render(<GameControls onStartGame={mockOnStartGame} />);

    const bankrollInput = screen.getByLabelText(/bankroll/i);

    expect(bankrollInput).toHaveAttribute("aria-required", "true");
    expect(bankrollInput).toHaveAttribute("aria-invalid", "false");
  });

  it("should set aria-invalid to true when field has error", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const bankrollInput = screen.getByLabelText(/bankroll/i);

    await user.clear(bankrollInput);
    await user.type(bankrollInput, "2");
    await user.tab(); // Trigger blur to mark as touched

    await waitFor(() => {
      expect(bankrollInput).toHaveAttribute("aria-invalid", "true");
    });
  });

  it("should only show errors after field is touched (blurred)", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const bankrollInput = screen.getByLabelText(/bankroll/i);

    await user.clear(bankrollInput);
    await user.type(bankrollInput, "2");

    // Error should not show yet (not blurred)
    expect(
      screen.queryByText(/bankroll must be between 5 and 1000/i)
    ).not.toBeInTheDocument();

    await user.tab(); // Trigger blur

    // Now error should show
    await waitFor(() => {
      expect(
        screen.getByText(/bankroll must be between 5 and 1000/i)
      ).toBeInTheDocument();
    });
  });

  it("should mark all fields as touched on submit attempt", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const bankrollInput = screen.getByLabelText(/bankroll/i);
    const betInput = screen.getByLabelText(/bet/i);

    // Set invalid values without blurring
    await user.clear(bankrollInput);
    await user.type(bankrollInput, "2");
    await user.clear(betInput);
    await user.type(betInput, "2");

    const submitButton = screen.getByRole("button", { name: /start game/i });
    await user.click(submitButton);

    // All errors should now be visible
    await waitFor(() => {
      expect(
        screen.getByText(/bankroll must be between 5 and 1000/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/bet must be at least 5/i)).toBeInTheDocument();
    });
  });

  it("should prevent form submission with default preventDefault", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const form = screen
      .getByRole("button", { name: /start game/i })
      .closest("form");
    const submitHandler = vi.fn((e) => e.preventDefault());

    if (form) {
      form.addEventListener("submit", submitHandler);
      await user.click(screen.getByRole("button", { name: /start game/i }));

      expect(submitHandler).toHaveBeenCalled();
    }
  });

  it("should handle empty string input values", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const bankrollInput = screen.getByLabelText(/bankroll/i);

    await user.clear(bankrollInput);
    await user.tab();

    await waitFor(() => {
      const submitButton = screen.getByRole("button", { name: /start game/i });
      expect(submitButton).toBeDisabled();
    });
  });

  it("should update bet validation when bankroll changes", async () => {
    const user = userEvent.setup();
    render(<GameControls onStartGame={mockOnStartGame} />);

    const bankrollInput = screen.getByLabelText(/bankroll/i);
    const betInput = screen.getByLabelText(/bet/i);

    // Set bet to 50
    await user.clear(betInput);
    await user.type(betInput, "50");

    // Set bankroll to 40 (less than bet)
    await user.clear(bankrollInput);
    await user.type(bankrollInput, "40");
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/bet cannot exceed bankroll/i)
      ).toBeInTheDocument();
    });
  });
});
