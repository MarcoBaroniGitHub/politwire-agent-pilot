import { calculate } from './calculator.mjs';

const [operation, left, right] = process.argv.slice(2);

try {
  if (process.argv.length !== 5 || !left.trim() || !right.trim()) {
    throw new Error('Usage : node cli.mjs <opération> <nombre> <nombre>');
  }

  console.log(calculate(operation, Number(left), Number(right)));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
