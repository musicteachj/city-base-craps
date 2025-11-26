# CityBase Senior Frontend Engineer Take Home Exercise

## 🎲 Live Demo

**[Play the Game Here](https://musicteachj.github.io/city-base-craps/)**

---

This is the skeleton project for the CityBase take home exercise. Please read and follow the instructions below.

_Important_ You do not need to complete this exercise in its entirety to be considered for the position you are interviewing for. We understand that everyone has different obligations and that some candidates may not have time to invest in completing the entire exercise. Please get as far as you are able, we will evaluate anything that you submit.

Generally, what we are looking for in this exercise is a demonstrated understanding of Javascript, React, and CSS, as well as attention to detail and knowledge of frontend specific concerns like WCAG accessibility and UI construction.

The skeleton application is configured to be completed in React, regular JS, and styled-components. The use of these technologies reflect those that we use day-to-day at CityBase. However, you may complete this exercise using TypeScript and/or any other styling method you choose. Addition of third party libraries is allowed, but inclusion and usage will be evaluated.

Please be prepared to discuss your implementation choices in future interviews.

## Application

The application we are asking you to complete is a (simplified) version of the casino dice game craps. The rules for our simplified version are included below. The exercise is laid out in a series of steps. You can complete the exercise by following along with the steps, or, if you choose, by reading all of the steps and building the final version.

A few bonus sections are included. These are completely optional, and it is possible to pass this exercise without completing any of them. Should you have any questions about the format of this exercise, please reach out to your CityBase contact.

## Rules of the Game

Our simplified version of the game of craps consists of two basic loops. In each loop, a pair of six-sided dice is rolled at least once, and possibly several times. The sum of the dice is used to determine whether a player wins or loses.

In the first loop, a pair of six-sided dice is rolled and summed, resulting in a number between 2-12, inclusive. If the sum is equal to the numbers 7 or 11, the player wins the round immediately and receives double their bet, and the game ends.

If the sum is equal to the numbers 2, 3, or 12, the player loses the round immediately and loses their bet, and the game ends.

If the sum is equal to any number other than 2, 3, 7, 11, or 12, the sum becomes a value known as "the point" and play proceeds to the second round.

In the second round, a player continues to roll a pair of dice. The objective is to match the value of "the point" before the player rolls the value of 7.

So, if a value of 9 was rolled in the first round, the player must roll 9 again _before_ rolling 7 to win. A player may roll the dice as many times as necessary until they either roll the number 9 or the number 7.

If the player matches "the point" with their roll, they win and receive double their bet, and the game ends. If the player first rolls 7, they lose, and lose their bet, and the game ends.

After the player has won or lost, the game concludes and a new game can begin.

### Exercise Steps

1. Complete a basic version of the above game in JS:

   The game should run one time, using a bet value of 5. Game results should be logged to the console when the dice are rolled, when the point value is set, and when the player wins or loses. A win should result in a value of 10, a loss should result in a value of 0.

2. Extend your game to run multiple times:

   The main function should take an argument representing the number of plays, and it should run multiple rounds based on the provided number. The bet value should still be 5, and the output logged should be the same as in step 1, with the start of each game specified in the output. Negative numbers are possible in this step, how to handle them in the functions is up to you.

3. Add bankroll and bet arguments:

   The main function should take two additional arguments representing a player "bankroll" (the sum of money they start and end the game with) and the player's bet. The function should run the game with these arguments. Each time a new game starts, the player's bet value should be subtracted from their bankroll. When a game concludes, any winnings should be added to the bankroll.

   The full game should end when either: the number of specified plays has been reached or the player's bankroll is < than the provided bet value.

   The game should log the final status of the player's bankroll, as well as how much the player has won or lost.

   No negative values should be possible in this step, as the game should not run if the player's bankroll does not have enough money to supply the bet value.

4. Create a UI:

   Move the output of your game from the browser console to the UI. Add a button to trigger the start of the game. Add form inputs to allow a user to specify the values of bankroll, number of plays, and bet value.

   The user's bankroll should be between the values of 5 and 1000, inclusive.

   The number of plays should be between the values of 1 and 100, inclusive.

   The user's bet should be between the values of 5, and the value of their current bankroll, inclusive.

   Values outside of these ranges should be disallowed with appropriate error messages. The game should not be allowed to start with invalid numbers.

The final, completed version of this game should be an interactive UI that allows a player to specify the three values of bankroll, bet, and number of plays. Running of the game should be triggered by a button press, and the game's output should be rendered within the UI and not the browser console.

### Bonus Steps

The following steps are optional. They are not necessary to pass this exercise, but completion of them will be regarded positively.

1. Animated Dice:

   We have included an almost complete set of CSS dice in the components folder. Add these to your UI and animate them such that they display the values of the dice rolled for each dice roll in the game.

2. Unit Tests:

   Add unit tests to your code to validate your functions or components.

3. Types:

   Write your application in TypeScript, or, include type comments using JSDoc or simple Haskell/Elm-like notation.
