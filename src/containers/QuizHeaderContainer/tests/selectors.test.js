import { getRoundName } from '../selectors';

import { initializedQuizStore } from 'utils/testData';

describe('getRoundName', () => {
  it('should return the name of the current round', () => {
    const roundName = getRoundName(initializedQuizStore);
    expect(roundName).toEqual('round 1');
  });
});
