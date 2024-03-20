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
            process.env.USER_1_ID = res.body.data.id;
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

// @ts-ignore
describe('Create User', () => {
    // @ts-ignore
        it('should log user in user successfully', (done: any) =>{
            chai.request(app)
            .post('/api/v1/users/login')
            .send({
                email: "fred@mailinator.com",
                password: "Password@1",
            })
            .end((err: Error, res: any) => {
                expect(res.body.message).to.eq('login successfull');
                process.env.AUTH_1_TOKEN = res.body.data.token;
                done();
            });
        });
    // @ts-ignore
        it('should return error if invalid credentials are provided', (done) => {
            chai.request(app)
            .post('/api/v1/users/login')
            .send({
                email: "fred@mailinator.com",
                password: "Password1@",
            })
            .end((err: Error, res: any) => {
                expect(res.body.message).to.eq('invalid credentials');
                done();
            });
        });
    });

    // @ts-ignore
describe('Create Posts', () => {
    // @ts-ignore
        it('should create post successfully', (done: any) =>{
            chai.request(app)
            .post(`/api/v1/users/${process.env.USER_1_ID}/posts`)
            .set('Authorization', `Bearer ${process.env.AUTH_1_TOKEN}`)
            .send({
                content: "some random content for the blog that doesn't not make any sense",
                title: "Random 1",
            })
            .end((err: Error, res: any) => {
                expect(res.body.message).to.eq(enums.RESOURCE_CREATED('post'));
                process.env.POST_1_ID = res.body.data.id;
                done();
            });
        });
    // @ts-ignore
        it('should return error if required fields are missing', (done) => {
            chai.request(app)
            .post(`/api/v1/users/${process.env.USER_1_ID}/posts`)
            .set('Authorization', `Bearer ${process.env.AUTH_1_TOKEN}`)
            .send({
                content: "some random content for the blog that doesn't not make any sense",
            })
            .end((err: Error, res: any) => {
                expect(res.body.message).to.eq('title is a required field,title must be a string');
                done();
            });
        });
        // @ts-ignore
        it('should create post 2 successfully', (done: any) =>{
            chai.request(app)
            .post(`/api/v1/users/${process.env.USER_1_ID}/posts`)
            .set('Authorization', `Bearer ${process.env.AUTH_1_TOKEN}`)
            .send({
                content: "some random content for the blog that doesn't not make any sense",
                title: "Random 1",
            })
            .end((err: Error, res: any) => {
                expect(res.body.message).to.eq(enums.RESOURCE_CREATED('post'));
                process.env.POST_2_ID = res.body.data.id;
                done();
            });
        });
            // @ts-ignore
            it('should create post 3 successfully', (done: any) =>{
                chai.request(app)
                .post(`/api/v1/users/${process.env.USER_1_ID}/posts`)
                .set('Authorization', `Bearer ${process.env.AUTH_1_TOKEN}`)
                .send({
                    content: "some random content for the blog that doesn't not make any sense",
                    title: "Random 1",
                })
                .end((err: Error, res: any) => {
                    expect(res.body.message).to.eq(enums.RESOURCE_CREATED('post'));
                    process.env.POST_3_ID = res.body.data.id;
                    done();
                });
            });
    });

        // @ts-ignore
    describe('Create User', () => {
        // @ts-ignore
            it('should fetch user post successfully', (done: any) =>{
                chai.request(app)
                .get(`/api/v1/users/${process.env.USER_1_ID}/posts`)
                .set('Authorization', `Bearer ${process.env.AUTH_1_TOKEN}`)
                .end((err: Error, res: any) => {
                    expect(res.body.message).to.eq('creator posts fetched');
                    done();
                });
            });
    });

    // @ts-ignore
describe('Create User', () => {
    // @ts-ignore
        it('should add comment to post 1 successfully', (done: any) =>{
            chai.request(app)
            .post(`/api/v1/posts/${process.env.POST_1_ID}/comments`)
            .set('Authorization', `Bearer ${process.env.AUTH_1_TOKEN}`)
            .send({
                content: "some random content for the blog that doesn't not make any sense",
            })
            .end((err: Error, res: any) => {
                expect(res.body.message).to.eq(enums.RESOURCE_CREATED('comment'));
                done();
            });
        });
        // @ts-ignore
        it('should add comment to post 2 successfully', (done: any) =>{
            chai.request(app)
            .post(`/api/v1/posts/${process.env.POST_2_ID}/comments`)
            .set('Authorization', `Bearer ${process.env.AUTH_1_TOKEN}`)
            .send({
                content: "some random content for the blog that doesn't not make any sense",
            })
            .end((err: Error, res: any) => {
                expect(res.body.message).to.eq(enums.RESOURCE_CREATED('comment'));
                done();
            });
        });
            // @ts-ignore
            it('should add another comment post 2 successfully', (done: any) =>{
                // @ts-ignore
                chai.request(app)
                .post(`/api/v1/posts/${process.env.POST_2_ID}/comments`)
                .set('Authorization', `Bearer ${process.env.AUTH_1_TOKEN}`)
                .send({
                    content: "some random content for the blog that doesn't not make any sense",
                })
                .end((err: Error, res: any) => {
                    expect(res.body.message).to.eq(enums.RESOURCE_CREATED('comment'));
                    done();
                });
            });
              // @ts-ignore
        it('should add a third comment to post 2 successfully', (done: any) =>{
            chai.request(app)
            .post(`/api/v1/posts/${process.env.POST_2_ID}/comments`)
            .set('Authorization', `Bearer ${process.env.AUTH_1_TOKEN}`)
            .send({
                content: "some random content for the blog that doesn't not make any sense",
            })
            .end((err: Error, res: any) => {
                expect(res.body.message).to.eq(enums.RESOURCE_CREATED('comment'));
                done();
            });
        });
            // @ts-ignore
            it('should add a comment to post 3 successfully', (done: any) =>{
                chai.request(app)
                .post(`/api/v1/posts/${process.env.POST_3_ID}/comments`)
                .set('Authorization', `Bearer ${process.env.AUTH_1_TOKEN}`)
                .send({
                    content: "some random content for the blog that doesn't not make any sense",
                })
                .end((err: Error, res: any) => {
                    expect(res.body.message).to.eq(enums.RESOURCE_CREATED('comment'));
                    done();
                });
            });
    });

    // @ts-ignore
describe('Fetch Posts', () => {
    // @ts-ignore
        it('should fetch top user post successfully', (done: any) =>{
            // @ts-ignore
            chai.request(app)
            .get(`/api/v1/posts`)
            .set('Authorization', `Bearer ${process.env.AUTH_1_TOKEN}`)
            .end((err: Error, res: any) => {
                expect(res.body.message).to.eq('top posts fetched');
                done();
            });
        });
    });
