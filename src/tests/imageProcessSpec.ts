import {checkInput, processPicture} from '../imageProcess';

describe('test check input function', () => {
  it('expect checkInput("", 200, 200) to throw error of "please provde a name to the picture in the url ...." ', () => {
    expect(() => {
      checkInput('', 200, 200);
    }).toThrowError(
      'please provde a name to the picture in the url. e.g http://localhost:3000/api/picture?name=santamonica&width=200&high=200'
    );
  });

  it('expect checkInput("aaaa", 200, 200) to throw error of "There is no such picture. ...." ', () => {
    expect(() => {
      checkInput('aaaa', 200, 200);
    }).toThrowError(
      'There is no such picture. The available names : santamonica, fjord, encenadaport, icelandwaterfall and palmtunnel'
    );
  });

  it('expect checkInput("santamonica", 0, 0) to throw error of "The high should be a number grater 10." ', () => {
    expect(() => {
      checkInput('santamonica', 0, 0);
    }).toThrowError('The high should be a number grater 10.');
  });

  it('expect checkInput("santamonica", 200, 200) to not throw error', () => {
    expect(() => {
      checkInput('santamonica', 200, 200);
    }).not.toThrowError();
  });
});

describe('test the image process function', () => {
  it('expect processPicture("santamonica", 200, 200) to not throw error', async (done) => {
    let res: string = '';
    try {
      res = await processPicture('santamonica', 200, 200);
    } catch (e) {
      res = 'error';
    }
    expect(res).not.toBe('error');
    done();
  });
});
