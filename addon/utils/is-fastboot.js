/* eslint-disable no-unused-vars */
// @ts-check
import { computed } from '@ember/object';
import ComputedProperty from '@ember/object/computed';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import ApplicationInstance from '@ember/application/instance';

/**
 * @return {ComputedProperty<boolean>}
 */
export default function isFastBootCPM() {
  return computed({
    get() {
      if (this.hasOwnProperty('isFastBootOverride')) {
        return this.isFastBootOverride;
      } else {
        return isFastBoot(getOwner(this));
      }
    },

    set(key, value) {
      this.isFastBootOverride = value;
      return value;
    }
  });
}

/**
 *
 * @param {ApplicationInstance} owner
 * @return {boolean}
 */
export function isFastBoot(owner) {
  assert('You may only use isFastBoot() on a container-aware object', owner && typeof owner.lookup === 'function');
  const fastboot = owner.lookup('service:fastboot');
  return fastboot ? fastboot.get('isFastBoot') : false;
}
