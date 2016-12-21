import { AngularCustomControlPage } from './app.po';

describe('angular-custom-control App', function() {
  let page: AngularCustomControlPage;

  beforeEach(() => {
    page = new AngularCustomControlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
