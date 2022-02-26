import { CLIENT_STATUSES, SERVER_STATUSES } from '../../utils/constants';

type Status = ValueOf<typeof CLIENT_STATUSES> | ValueOf<typeof SERVER_STATUSES>;

export class ApiError extends Error {
  readonly status: Status;

  public constructor(status: Status, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }

  public static createBadRequestError(message?: string) {
    return new ApiError(CLIENT_STATUSES.BAD_REQUEST, message ?? 'Недействительные параметры запроса');
  }

  public static createUnauthorizedError(message?: string) {
    return new ApiError(CLIENT_STATUSES.UNAUTHORIZED, message ?? 'Пользователь не авторизован');
  }

  public static createForbiddenError(message?: string) {
    return new ApiError(CLIENT_STATUSES.FORBIDDEN, message ?? 'Недостаточно прав для выполнения запроса');
  }
}
