/**
 * This function will return the lectures IDs that will be allocated in a given time capacity
 * This function works using the Knapsack 0-1 algorithm using bottom-up DP approach
 * @param {array} lectures
 * @param {int} capacity
 * @returns {array} Integer array contaning the selected lectures indexes
 */
const knapsackHelper = (lectures, capacity) => {
  const n = lectures.length;

  let weightMatrix = new Array(n + 1);

  //Initialize weight matrix
  for (let i = 0; i < n + 1; ++i) {
    weightMatrix[i] = new Array(capacity + 1);
  }

  //Fill in weight matrix and keep matrix in order to extract which lecture will be considered in the section
  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      //Top row and first column will be filled with 0
      if (i === 0 || w === 0) weightMatrix[i][w] = 0;
      //If we can include a given lecture
      else if (lectures[i - 1].timeAmount <= w)
        weightMatrix[i][w] = Math.max(
          1 + weightMatrix[i - 1][w - lectures[i - 1].timeAmount],
          weightMatrix[i - 1][w]
        );
      //Otherwise, the lecture is not included
      else weightMatrix[i][w] = weightMatrix[i - 1][w];
    }
  }

  let totalWeight = weightMatrix[n][capacity];
  let result = [];
  let weightIdx = capacity;

  //Extract which lectures were selected and store its indexes
  for (let i = n; i > 0 && totalWeight > 0; --i) {
    if (totalWeight == weightMatrix[i - 1][weightIdx]) continue;
    else {
      result.push(i - 1);
      totalWeight--;
      weightIdx -= lectures[i - 1].timeAmount;
    }
  }

  return result;
};

module.exports = knapsackHelper;
