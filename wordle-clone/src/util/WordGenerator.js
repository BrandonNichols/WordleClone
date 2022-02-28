import { data } from "../data/data";

const keyArray = Object.keys(data);
const randomWord = keyArray[Math.floor(Math.random() * keyArray.length)];

export { randomWord };
