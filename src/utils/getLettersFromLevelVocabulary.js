export function getLettersFromLevelVocabulary(words) {
  const counts = {};

  for (let word of words) {
    const currentWordCounts = {}
    word.split('').forEach(letter => {
      currentWordCounts[letter] = currentWordCounts[letter] ? currentWordCounts[letter] + 1 : 1;
    })

    Object.entries(currentWordCounts).forEach(([letter, count]) => {
      if (!counts[letter] || counts[letter] < count) {
        counts[letter] = count;
      }
    })
  }

  return Object.entries(counts).flatMap(([letter, count]) =>
    Array(count).fill(letter)
  );
}