/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

const os = require('os');

// eslint-disable-next-line arrow-parens
const getMaxWorkers = (argv: Object): number => {
  if (argv.runInBand) {
    return 1;
  } else if (argv.maxWorkers) {
    const parsed = parseInt(argv.maxWorkers, 10);

    if (
      typeof argv.maxWorkers === 'string' &&
      argv.maxWorkers.trim().endsWith('%') &&
      parsed > 0 &&
      parsed <= 100
    ) {
      const cpus = os.cpus().length;
      const workers = Math.floor(parsed / 100 * cpus);

      return workers >= 1 ? workers : 1;
    }

    return parsed;
  } else {
    const cpus = os.cpus().length;
    return Math.max(argv.watch ? Math.floor(cpus / 2) : cpus - 1, 1);
  }
};

module.exports = getMaxWorkers;
