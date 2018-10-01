import { IPCSPage } from './app.po';

describe('ipcs App', () => {
  let page: IPCSPage;

  beforeEach(() => {
    page = new IPCSPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
