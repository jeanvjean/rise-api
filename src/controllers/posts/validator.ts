import {ValidationChain, validationResult, check} from 'express-validator';
import {RequestHandler, Request, Response, NextFunction} from 'express';
import Ctrl from '../../controllers/ctrl';
import {BadInputFormatException} from '../../exceptions/index';


export default class PostValidator extends Ctrl {
  /**
       * @return {ValidationChain[]}
  */
  validate(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = validationResult(req);
      const hasErrors = !result.isEmpty();
      const errors = result.array();
      if (hasErrors) {
        const error = new BadInputFormatException(
          errors.map((i) => i.msg).join(','),
          errors.map((e) => e.msg)
        );
        return this.handleError(error, req, res);
      }
      return next();
    };
  }

  static validateCreatePostSchema(): ValidationChain[] {
    return [
      check('title')
        .exists()
        .withMessage('title is a required field')
        .isString()
        .withMessage('title must be a string'),
      check('content')
        .exists()
        .withMessage('content is a required field')
        .isString()
        .withMessage('content must be a string'),
    ];
  }

  static validateCommentSchema(): ValidationChain[] {
    return [
      check('content')
        .exists()
        .withMessage('content is a required field')
        .isString()
        .withMessage('content must be a string'),
    ];
  }
}
