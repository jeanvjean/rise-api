import {ValidationChain, validationResult, check} from 'express-validator';
import {RequestHandler, Request, Response, NextFunction} from 'express';
import Ctrl from '../../controllers/ctrl';
import {BadInputFormatException} from '../../exceptions/index';


export default class UserValidator extends Ctrl {
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

  static validateUserSchema(): ValidationChain[] {
    return [
      check('first_name')
        .exists({checkFalsy: false})
        .isString()
        .withMessage('first_name must be a string'),
      check('email')
        .exists()
        .withMessage('email is required'),
      check('phone_number')
        .exists()
        .withMessage('phone number is required')
        .matches(/^(\+\d{2,3})(?:\d\s?){9,10}$/)
        .withMessage('Phone number must contain international code as well as 9 or 10 digits!'),
      check('last_name')
        .exists()
        .withMessage('license number is required'),
      check('password')
        .exists()
        .withMessage('Password is required')
        .isLength({min: 6})
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
        .withMessage('Password must be at least six(6) character long and most contain at least 1 letter, 1 number and 1 special character')
    ];
  }

  static validateLoginSchema(): ValidationChain[] {
    return [
      check('email')
        .exists()
        .withMessage('email is required'),
      check('password')
        .exists()
        .withMessage('Password is required')
        .isLength({min: 6})
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
        .withMessage('Password must be at least six(6) character long and most contain at least 1 letter, 1 number and 1 special character')
    ];
  }
}
