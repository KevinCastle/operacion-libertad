import test from 'node:test';
import assert from 'node:assert/strict';
import { DEADLINE, REFERENCE_TIME, getCountdown } from '../libertad/dist/countdown.mjs';

test('the reported remaining interval is exactly 2 days, 3 hours and 41 minutes', () => {
  const result = getCountdown(REFERENCE_TIME);
  assert.deepEqual([result.days, result.hours, result.minutes, result.seconds], [2, 3, 41, 0]);
  assert.equal(result.finished, false);
});

test('Lima and Santiago deadline representations identify the same instant', () => {
  assert.equal(DEADLINE, Date.parse('2026-11-07T18:30:00-05:00'));
  assert.equal(DEADLINE, Date.parse('2026-11-07T20:30:00-03:00'));
});

test('the last partial second still shows one second instead of celebrating early', () => {
  const result = getCountdown(DEADLINE - 1);
  assert.equal(result.totalSeconds, 1);
  assert.equal(result.seconds, 1);
  assert.equal(result.finished, false);
});

test('the exact deadline starts the celebration', () => {
  const result = getCountdown(DEADLINE);
  assert.equal(result.totalSeconds, 0);
  assert.equal(result.finished, true);
  assert.equal(result.progress, 1);
});

test('opening the page after the deadline never produces negative values', () => {
  const result = getCountdown(DEADLINE + 86400000);
  assert.deepEqual([result.days, result.hours, result.minutes, result.seconds], [0, 0, 0, 0]);
  assert.equal(result.finished, true);
  assert.equal(result.progress, 1);
});

test('resuming after a suspended tab derives the correct time directly from the clock', () => {
  getCountdown(REFERENCE_TIME);
  const result = getCountdown(DEADLINE - 61500);
  assert.equal(result.minutes, 1);
  assert.equal(result.seconds, 2);
});

test('progress starts two weeks before the original reference without changing the countdown', () => {
  const start = Date.parse('2026-10-22T19:49:00Z');
  assert.equal(getCountdown(start).progress, 0);
  const expected = (REFERENCE_TIME - start) / (DEADLINE - start);
  assert.ok(Math.abs(getCountdown(REFERENCE_TIME).progress - expected) < 1e-12);
});

test('progress reaches halfway halfway through the complete October-to-November interval', () => {
  const start = Date.parse('2026-10-22T19:49:00Z');
  assert.equal(getCountdown((start + DEADLINE) / 2).progress, 0.5);
});

test('progress stays within its bounds before the October start', () => {
  assert.equal(getCountdown(Date.parse('2026-10-21T19:49:00Z')).progress, 0);
});
