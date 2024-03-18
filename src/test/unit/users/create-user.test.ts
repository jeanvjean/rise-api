import 'mocha';
import * as chai from 'chai';
import * as chaiHttp from 'chai-http';
import Application from '../../../app';
import enums from '@src/configs/enums';

const { expect } = chai;


chai.use(chaiHttp);

const app = new Application().express;

// @ts-ignore
describe('Create User', () => {
// @ts-ignore
    it('should create user successfully', (done: any) =>{
        chai.request(app)
        .post('/api/v1/users')
        .send({
            first_name: "Freddy",
            last_name: "Jay",
            email: "fred@mailinator.com",
            password: "Password@1",
            phone_number: "+2349066263759"
        })
        .end((err: Error, res: any) => {
            expect(res.body.message).to.eq(enums.RESOURCE_CREATED('user'));
            done();
        });
    });
// @ts-ignore
    it('should return error if the user already exists', (done) => {
        chai.request(app)
        .post('/api/v1/users')
        .send({
            first_name: "Freddy",
            last_name: "Jay",
            email: "fred@mailinator.com",
            password: "Password@1",
            phone_number: "+2349066263759"
        })
        .end((err: Error, res: any) => {
            expect(res.body.message).to.eq(enums.RESOURCE_EXISTS('user'));
            done();
        });
    });
});
