import { BasePkg } from './base-pkg';
import { IPackage } from '../interface';

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
      'https://cdn.jsdelivr.net/npm/@easepick/datetime@__VERSION__/dist/index.umd.min.js',
      'https://cdn.jsdelivr.net/npm/@easepick/core@__VERSION__/dist/index.umd.min.js',
      'https://cdn.jsdelivr.net/npm/@easepick/base-plugin@__VERSION__/dist/index.umd.min.js',
      'https://cdn.jsdelivr.net/npm/@easepick/time-plugin@__VERSION__/dist/index.umd.min.js',
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