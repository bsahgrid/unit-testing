import { getUtcStringDate } from 'tasks/task3';
import { setupMockDate, MockDateSetup } from './testUtils';

describe('task3', () => {
  let mockDate: MockDateSetup;

  beforeEach(() => {
    mockDate = setupMockDate();
  });

  afterEach(() => {
    mockDate.reset();
  });

  it('uses current date when no argument provided', () => {
    mockDate.set({ isoDate: '2019-03-05T14:08:07.673Z' });
    expect(getUtcStringDate()).toBe('2019-03-05T14:08:07Z');
  });

  it('accepts a date with an explicit timezone offset and returns UTC ISO8601 string', () => {
    const input = new Date('2007-01-31T23:15:00+02:00');
    expect(getUtcStringDate(input)).toBe('2007-01-31T21:15:00Z');
  });

  it('accepts a date constructed in a non-UTC timezone and returns UTC string (UTC+2)', () => {
    mockDate.set({ offset: 120 });
    const input = new Date(2007, 0, 31, 23, 15, 0);
    expect(getUtcStringDate(input)).toBe('2007-01-31T21:15:00Z');
  });

  it('accepts a date constructed in a non-UTC timezone and returns UTC string (UTC-5)', () => {
    mockDate.set({ offset: -300 });
    const input = new Date(2007, 0, 31, 23, 15, 0);
    expect(getUtcStringDate(input)).toBe('2007-02-01T04:15:00Z');
  });
});
