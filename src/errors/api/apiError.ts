import { CLIENT_STATUSES, SERVER_STATUSES } from '@utils/constants';

type ErrorStatus = ValueOf<typeof CLIENT_STATUSES> | ValueOf<typeof SERVER_STATUSES>;
type ErrorParams = Record<string, string>;

export class ApiError extends Error {
  readonly status: ErrorStatus;
  readonly errorParams: ErrorParams;

  public constructor(status: ErrorStatus, messagePath: string, errorParams?: ErrorParams) {
    super(messagePath);
    this.name = this.constructor.name;
    this.status = status;
    this.errorParams = errorParams;
  }

  public static createBadRequestError(messagePath?: string, errorParams?: ErrorParams) {
    return new ApiError(CLIENT_STATUSES.BAD_REQUEST, messagePath ?? 'error.client.badRequest', errorParams);
  }

  public static createUnauthorizedError(messagePath?: string, errorParams?: ErrorParams) {
    return new ApiError(CLIENT_STATUSES.UNAUTHORIZED, messagePath ?? 'error.client.unauthorized', errorParams);
  }

  public static createForbiddenError(messagePath?: string, errorParams?: ErrorParams) {
    return new ApiError(CLIENT_STATUSES.FORBIDDEN, messagePath ?? 'error.client.forbidden', errorParams);
  }

  public static createServerInternalError() {
    return new ApiError(SERVER_STATUSES.INTERNAL_ERROR, 'error.server.internal');
  }
}
