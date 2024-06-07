// test/questionRoutes.test.ts
import { router } from '../routes/questionRoutes';
import { questionController } from '../routes/questionRoutes';

jest.mock('../routes/questionRoutes', () => {
    return {
        router: {
            post: jest.fn(),
            get: jest.fn(),
            delete: jest.fn(),
        },
        questionController: {
            create: jest.fn(),
            getAll: jest.fn(),
            getOne: jest.fn(),
            delete: jest.fn(),
        },
    };
});

describe('questionRoutes', () => {
    // get request to questions 
    it('should test get request to questions', async () => {
        (router).get('/');
        expect(router.get).toHaveReturned();
    });

    it('should test get request to questions', async () => {
        (router).get('/:id');
        expect(router.get).toHaveReturned();
    }
    );

    it('should test post request to questions', async () => {
        (router).post('/');
        expect(router.post).toHaveReturned();
    });

    it('should test delete request to questions', async () => {
        (router).delete('/:id');
        expect(router.delete).toHaveReturned();
    });

    it('should test create question', async () => {
        questionController.create();
        expect(questionController.create).toHaveReturned();
    });

    it('should test get all questions', async () => {
        questionController.getAll();
        expect(questionController.getAll).toHaveReturned();
    });
});