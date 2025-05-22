import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  ForbiddenException,
  GoneException,
  HttpException,
  HttpVersionNotSupportedException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
  NotAcceptableException,
  NotFoundException,
  PayloadTooLargeException,
  RequestTimeoutException,
  UnauthorizedException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { ApiError } from './base.error';

@Injectable()
export class TransformErrorForHttpTypeInterceptor implements NestInterceptor {
  private readonly logger = new Logger(
    TransformErrorForHttpTypeInterceptor.name,
  );

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ApiError) {
          const { message, status, details } = error;

          this.logger.error(
            `Erro capturado em ${request.method} ${request.url}`,
            JSON.stringify({ message, status, details, stack: error.stack }),
          );

          switch (status) {
            case 400:
              throw new BadRequestException(message);
            case 401:
              throw new UnauthorizedException(message);
            case 403:
              throw new ForbiddenException(message);
            case 404:
              throw new NotFoundException(message);
            case 406:
              throw new NotAcceptableException(message);
            case 408:
              throw new RequestTimeoutException(message);
            case 410:
              throw new GoneException(message);
            case 413:
              throw new PayloadTooLargeException(message);
            case 415:
              throw new UnsupportedMediaTypeException(message);
            case 422:
              throw new UnprocessableEntityException(message);
            case 429:
              throw new BadRequestException(message);
            case 505:
              throw new HttpVersionNotSupportedException(message);
            case 409:
              throw new ConflictException(message);
            case 500:
              throw new InternalServerErrorException(message);
            default:
              throw new HttpException(message, status);
          }
        } else {
          throw error;
        }
      }),
    );
  }
}
