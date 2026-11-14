import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { calculate } from './calculator.mjs';

test('calcule les quatre opérations', () => {
  assert.equal(calculate('add', 2, 3), 5);
  assert.equal(calculate('sub', 2, 3), -1);
  assert.equal(calculate('mul', -2, 3), -6);
  assert.equal(calculate('div', 7, 2), 3.5);
});

test('signale une division par zéro', () => {
  assert.throws(() => calculate('div', 1, 0), /Division par zéro/);
});

test('refuse une opération inconnue', () => {
  assert.throws(() => calculate('inconnue', 1, 2), /Opération inconnue/);
});

test('refuse les opérandes et résultats non finis', () => {
  assert.throws(() => calculate('add', NaN, 2), /nombres finis/);
  assert.throws(() => calculate('mul', Number.MAX_VALUE, 2), /hors limites/);
});

const cli = fileURLToPath(new URL('./cli.mjs', import.meta.url));

test('affiche le résultat en ligne de commande', () => {
  const run = spawnSync(process.execPath, [cli, 'add', '2', '3'], { encoding: 'utf8' });
  assert.equal(run.status, 0);
  assert.equal(run.stdout.trim(), '5');
});

test('renvoie un code d’échec pour une saisie invalide', () => {
  const run = spawnSync(process.execPath, [cli, 'add', ' ', '3'], { encoding: 'utf8' });
  assert.equal(run.status, 1);
  assert.match(run.stderr, /Usage/);
});
