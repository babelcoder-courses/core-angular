import { CoreAngularPage } from './app.po';

describe('core-angular App', () => {
  let page: CoreAngularPage;

  beforeEach(() => {
    page = new CoreAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
