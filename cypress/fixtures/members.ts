import { Member, MemberFactory } from '@graasp/sdk';

const ANNA = MemberFactory({ name: 'anna', email: 'anna@graasp.org' });
const BOB = MemberFactory({ name: 'bob', email: 'bob@graasp.org' });

export const MEMBERS: { [key: string]: Member } = {
  ANNA,
  BOB,
};

export const CURRENT_MEMBER = MEMBERS.ANNA;
