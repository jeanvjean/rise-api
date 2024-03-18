import { BadInputFormatException } from "@src/exceptions";

/**
 * Base model class
 * @category Modules
 */
export abstract class Module {
  handleException(error: Error): void {
    throw new BadInputFormatException(error.message);
  }
}
