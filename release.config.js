/* eslint no-undef: 0 */

module.exports = {
  branch: 'master',
  dryRun: false,
  debug: true,
  pkgRoot: '.',
  plugins: [
    require('@semantic-release/commit-analyzer'),
    require('@semantic-release/release-notes-generator'),
    [
      require('@semantic-release/npm'),
      {
        npmPublish: false
      }
    ],
    require('@semantic-release/github')
  ]
};
