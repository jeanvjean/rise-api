import Exception from './exception';
import enums from '../configs/enums';

class ResourceNotFoundException extends Exception {
	public type: string | undefined

	public constructor(message?: string, type?: string) {
	  super(message);
	  Object.setPrototypeOf(this, new.target.prototype);
	  this.name = ResourceNotFoundException.name;
	  this.code = enums.HTTP_NOT_FOUND;
	  this.type = type;
	}
}

export default ResourceNotFoundException;
