export class CommentLabels {

  public static EN = class {
    public static LABELS: object = {
      title: 'Comment',
      pageDescription: 'This page allows the user to comment on posts on the Platform as well as posts/articles/etc. on external webpages' +
        '. There will be 3 tabs to input the post to which the user responds:',
      externalURL: 'External URL',
      externalURLDescription: '(1) URL tab for external webpages - the Page will then automatically parse the URL and allow the user to ' +
        'respond sentence by sentence.',
      manually: 'Manually',
      manuallyDescription: '(2) a tab where the user can manually enter the text data he or she is responding to - the Page will then ' +
        'parse the text similar to tab 1.',
      searchFieldURL: 'Search field/URL',
      searchFieldURLDescription: '(3) a tab for posts within the Platform (based on a search field/URL). The Page will identify the ' +
        'underlying data structure and allow the user to comment.'
    };
  };

}
