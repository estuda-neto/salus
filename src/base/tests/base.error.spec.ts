import { ApiError } from '../base.error';

describe('ApiError', () => {
  it('should be an instance of Error', () => {
    const error = new ApiError('Something went wrong');
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toBeInstanceOf(Error);
  });

  it('should have a message, status and optional details', () => {
    const message = 'Invalid input';
    const status = 400;
    const details = { field: 'email', issue: 'required' };

    const error = new ApiError(message, status, details);

    expect(error.message).toBe(message);
    expect(error.status).toBe(status);
    expect(error.details).toEqual(details);
  });

  it('should default the status to 500 if not provided', () => {
    const error = new ApiError('Internal error');
    expect(error.status).toBe(500);
  });

  it('should preserve the stack trace', () => {
    const error = new ApiError('Stack trace test');
    expect(error.stack).toBeDefined();
  });
});
