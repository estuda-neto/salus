import { of, throwError, firstValueFrom } from 'rxjs';
import { CallHandler, ExecutionContext, BadRequestException, UnauthorizedException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { TransformErrorForHttpTypeInterceptor } from '../base.interception';
import { ApiError } from '../base.error';

describe('TransformErrorForHttpTypeInterceptor', () => {
    let interceptor: TransformErrorForHttpTypeInterceptor;
    let context: ExecutionContext;
    let callHandler: CallHandler;

    beforeEach(() => {
        interceptor = new TransformErrorForHttpTypeInterceptor();

        context = {
            switchToHttp: () => ({
                getRequest: () => ({
                    method: 'GET',
                    url: '/test-endpoint',
                }),
            }),
        } as unknown as ExecutionContext;

        jest.spyOn(interceptor['logger'], 'error').mockImplementation(() => { });
    });

    it('should transform ApiError with status 400 into BadRequestException', async () => {
        const apiError = new ApiError('Invalid data', 400);
        callHandler = {
            handle: () => throwError(() => apiError),
        };

        await expect(firstValueFrom(interceptor.intercept(context, callHandler))).rejects.toThrow(BadRequestException);

        expect(interceptor['logger'].error).toHaveBeenCalledWith(
            expect.stringContaining('Erro capturado em GET /test-endpoint'),
            expect.stringContaining('Invalid data'),
        );
    });

    it('should transform ApiError with status 401 into UnauthorizedException', async () => {
        const apiError = new ApiError('Unauthorized', 401);
        callHandler = {
            handle: () => throwError(() => apiError),
        };

        await expect(firstValueFrom(interceptor.intercept(context, callHandler))).rejects.toThrow(UnauthorizedException);
    });

    it('should transform ApiError with status 403 into ForbiddenException', async () => {
        const apiError = new ApiError('Forbidden', 403);
        callHandler = {
            handle: () => throwError(() => apiError),
        };

        await expect(firstValueFrom(interceptor.intercept(context, callHandler))).rejects.toThrow(ForbiddenException);
    });

    it('should transform ApiError with status 404 into NotFoundException', async () => {
        const apiError = new ApiError('Not found', 404);
        callHandler = {
            handle: () => throwError(() => apiError),
        };

        await expect(firstValueFrom(interceptor.intercept(context, callHandler))).rejects.toThrow(NotFoundException);
    });

    it('should transform ApiError with unknown status into generic HttpException', async () => {
        const apiError = new ApiError('Custom error', 499);
        callHandler = {
            handle: () => throwError(() => apiError),
        };

        await expect(firstValueFrom(interceptor.intercept(context, callHandler))).rejects.toThrow('Custom error');
    });

    it('should rethrow errors that are not instances of ApiError', async () => {
        const otherError = new Error('Other error');
        callHandler = {
            handle: () => throwError(() => otherError),
        };

        await expect(firstValueFrom(interceptor.intercept(context, callHandler))).rejects.toThrow('Other error');
    });

    it('should pass through successfully if no error is thrown', async () => {
        const data = { message: 'OK' };
        callHandler = {
            handle: () => of(data),
        };

        const result = await firstValueFrom(interceptor.intercept(context, callHandler));
        expect(result).toEqual(data);
    });
});
