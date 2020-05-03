/* eslint-env jest */
import '@testing-library/jest-dom/extend-expect';
import {matchers} from '#src/testing/matchers';

expect.extend(matchers());

/* globals process */
/* istanbul ignore next */
// eslint-disable-next-line no-process-env
if (!process.env.handlingUnhandledRejection) {
  /* istanbul ignore next */
  process.on('unhandledRejection', (err) => {
    throw err;
  });
  // eslint-disable-next-line no-process-env
  process.env.handlingUnhandledRejection = true;
}
