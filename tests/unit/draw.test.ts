import { describe, expect, it } from 'vitest';
import { gradeDraw, inside, overlap, ownerAt, type DrawRegion } from '../../src/shared/lib/draw.ts';
import type { LonLat } from '../../src/shared/data/types.ts';

const box = (x0: number, y0: number, x1: number, y1: number): LonLat[] => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];

describe('画疆域 (drawing a border from memory)', () => {
  const regions: DrawRegion[] = [
    { polity: 'tang', rings: [box(100, 20, 120, 40)] },
    // a later region carves into tang
    { polity: 'tibet', rings: [box(100, 30, 105, 40)] },
  ];

  it('finds the polity painted on top', () => {
    expect(inside([box(0, 0, 10, 10)], 5, 5)).toBe(true);
    expect(inside([box(0, 0, 10, 10), box(2, 2, 8, 8)], 5, 5)).toBe(false);
    expect(ownerAt(regions, 110, 25)).toBe('tang');
    expect(ownerAt(regions, 102, 35)).toBe('tibet');
    expect(ownerAt(regions, 90, 25)).toBeNull();
  });

  it('scores an exact outline near 1, a shifted one lower, a far one 0', () => {
    const exact = overlap([[105, 20], [120, 20], [120, 40], [105, 40], [105, 30], [100, 30], [100, 20]], regions, 'tang');
    expect(exact.iou).toBeGreaterThan(0.95);
    const shifted = overlap(box(104, 22, 124, 42), regions, 'tang');
    expect(shifted.iou).toBeGreaterThan(0.4);
    expect(shifted.iou).toBeLessThan(0.8);
    expect(overlap(box(60, 50, 70, 60), regions, 'tang').iou).toBe(0);
  });

  it('tells covering too much from covering too little', () => {
    const big = overlap(box(90, 10, 130, 50), regions, 'tang');
    expect(big.cover).toBeGreaterThan(0.95);
    expect(big.precise).toBeLessThan(0.4);
    const small = overlap(box(110, 22, 115, 28), regions, 'tang');
    expect(small.precise).toBeGreaterThan(0.95);
    expect(small.cover).toBeLessThan(0.2);
  });

  it('needs three points and a polity on the map', () => {
    expect(overlap([[100, 20], [120, 40]], regions, 'tang').iou).toBe(0);
    expect(overlap(box(100, 20, 120, 40), regions, 'song').iou).toBe(0);
  });

  it('grades half the area right as correct', () => {
    expect(gradeDraw(0.62)).toBe('correct');
    expect(gradeDraw(0.4)).toBe('close');
    expect(gradeDraw(0.1)).toBe('wrong');
  });
});
