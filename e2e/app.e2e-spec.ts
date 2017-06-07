import { TargetLife2Page } from './app.po';

describe('target-life2 App', () => {
  let page: TargetLife2Page;

  beforeEach(() => {
    page = new TargetLife2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
