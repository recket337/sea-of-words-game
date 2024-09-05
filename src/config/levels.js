import level_1 from "./1.json"
import level_2 from "./2.json"
import level_3 from "./3.json"

const levels = [level_1.words, level_2.words, level_3.words].map(level => level.sort((a, b) => a.length - b.length));

export default levels;