import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.BAD_REQUEST;
        const message =
            exception instanceof Error &&
            !(exception instanceof InternalServerErrorException)
                ? exception.message
                : 'Something went wrong.';

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}
