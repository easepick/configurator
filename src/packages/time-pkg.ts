import { BasePkg } from './base-pkg';
import { IPackage } from './interface';

export class TimePkg extends BasePkg implements IPackage {
  public name = '@easepick/time-plugin';
  public description = 'Adds time picker.';
  public url = 'https://easepick.com/packages/time-plugin';
  public optionKey = 'TimePlugin';
  public setup = {
    npm: [
      'npm install @easepick/core',
      'npm install @easepick/time-plugin',
    ],
    cdn: [
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/datetime@[version]/dist/index.umd.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/core@[version]/dist/index.umd.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/base-plugin@[version]/dist/index.umd.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/time-plugin@[version]/dist/index.umd.min.js"></script>',
    ],
  }

  public fillOptions() {
    this.options = [
      {
        configurable: true,
        children: [
          {
            name: 'seconds',
            default: false,
            type: 'boolean',
            configurable: true,
          },
          {
            name: 'stepHours',
            default: 1,
            type: 'range',
            min: 1,
            max: 12,
            configurable: true,
          },
          {
            name: 'stepMinutes',
            default: 5,
            type: 'range',
            min: 1,
            max: 60,
            configurable: true,
          },
          {
            name: 'stepSeconds',
            default: 5,
            type: 'range',
            min: 1,
            max: 60,
            configurable: true,
          },
          {
            name: 'format12',
            default: false,
            type: 'boolean',
            configurable: true,
          },
        ],
      }
    ];
  }
}