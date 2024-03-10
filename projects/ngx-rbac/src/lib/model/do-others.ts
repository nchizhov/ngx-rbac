import { DoRuleType } from '../type/do-rule-type';
import { DoRule } from './do-rule';

export function creatStringRule(checkerName: string): DoRuleType {
  const parentRule = new DoRule((args, [userRoles, rulesSnapshot]) => {
    if (!rulesSnapshot[checkerName]) {
      throw Error('No rule for ' + checkerName);
    }
    parentRule.assignChildRules(rulesSnapshot[checkerName]);
    return rulesSnapshot[checkerName].check(args, [userRoles, rulesSnapshot]);
  }, `Look up for ${checkerName}`);
  return parentRule;
}
