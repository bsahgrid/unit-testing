import { validateUserName } from 'tasks/task1/index';
import { fetchIsUserNameAvailable } from 'tasks/task1/fetchIsUserNameValid';

jest.mock('tasks/task1/fetchIsUserNameValid', () => ({
  fetchIsUserNameAvailable: jest.fn(),
}));

describe('task1: validateUserName', () => {
  const mockedFetchIsUserNameAvailable = jest.mocked(fetchIsUserNameAvailable);

  beforeEach(() => {
    mockedFetchIsUserNameAvailable.mockReset();
  });

  it('returns false if name has length less than 3 symbols (no request)', async () => {
    await expect(validateUserName('ab')).resolves.toBe(false);
    expect(mockedFetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  it('returns false if name contains non-alphanumeric symbols (no request)', async () => {
    await expect(validateUserName('ab!')).resolves.toBe(false);
    await expect(validateUserName('ab ')).resolves.toBe(false);
    await expect(validateUserName('ab-')).resolves.toBe(false);
    expect(mockedFetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  it('returns false if name starts with a number (no request)', async () => {
    await expect(validateUserName('1ab')).resolves.toBe(false);
    expect(mockedFetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  it('returns true when name is valid and available', async () => {
    mockedFetchIsUserNameAvailable.mockResolvedValue(true);
    await expect(validateUserName('abc')).resolves.toBe(true);
    expect(mockedFetchIsUserNameAvailable).toHaveBeenCalledTimes(1);
    expect(mockedFetchIsUserNameAvailable).toHaveBeenCalledWith('abc');
  });

  it('returns false when name is valid but not available', async () => {
    mockedFetchIsUserNameAvailable.mockResolvedValue(false);
    await expect(validateUserName('abc')).resolves.toBe(false);
    expect(mockedFetchIsUserNameAvailable).toHaveBeenCalledTimes(1);
  });

  it('returns false when availability request fails', async () => {
    mockedFetchIsUserNameAvailable.mockRejectedValue(new Error('network'));
    await expect(validateUserName('abc')).resolves.toBe(false);
    expect(mockedFetchIsUserNameAvailable).toHaveBeenCalledTimes(1);
  });
});