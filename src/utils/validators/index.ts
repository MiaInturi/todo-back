import { UsersController } from '../../controllers/users/users-controller';

const getControllerMethods = (controller: ClassType) => (
  Object.getOwnPropertyNames(controller).filter((property) => typeof controller[property] === 'function')
);
