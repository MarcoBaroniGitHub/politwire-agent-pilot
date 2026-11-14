export function calculate(operation, left, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new TypeError('Les deux opérandes doivent être des nombres finis.');
  }

  let result;
  switch (operation) {
    case 'add':
      result = left + right;
      break;
    case 'sub':
      result = left - right;
      break;
    case 'mul':
      result = left * right;
      break;
    case 'pct':
      result = (left / 100) * right;
      break;
    case 'div':
      if (right === 0) throw new RangeError('Division par zéro.');
      result = left / right;
      break;
    default:
      throw new RangeError('Opération inconnue.');
  }

  if (!Number.isFinite(result)) throw new RangeError('Résultat hors limites.');
  return result;
}
