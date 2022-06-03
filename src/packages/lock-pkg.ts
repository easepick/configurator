import { BasePkg } from './base-pkg';
import { IPackage } from '../interface';

export class LockPkg extends BasePkg implements IPackage {
  public name = '@easepick/lock-plugin';
  public description = 'Adds the ability to disable days for selection.';
  public url = 'https://easepick.com/packages/lock-plugin';
  public optionKey = 'LockPlugin';
  public setup = {
    npm: [
      'npm install @easepick/core',
      'npm install @easepick/lock-plugin',
    ],
    cdn: [
      'https://cdn.jsdelivr.net/npm/@easepick/datetime@__VERSION__/dist/index.umd.min.js',
      'https://cdn.jsdelivr.net/npm/@easepick/core@__VERSION__/dist/index.umd.min.js',
      'https://cdn.jsdelivr.net/npm/@easepick/base-plugin@__VERSION__/dist/index.umd.min.js',
      'https://cdn.jsdelivr.net/npm/@easepick/lock-plugin@__VERSION__/dist/index.umd.min.js',
    ],
  }

  public fillOptions() {
    this.options = [
      {
        configurable: true,
        children: [
          {
            name: 'minDate',
            default: null,
            type: 'date',
            configurable: true,
          },
          {
            name: 'maxDate',
            default: null,
            type: 'date',
            configurable: true,
          },
          {
            name: 'minDays',
            default: null,
            type: 'number',
            configurable: true,
            requirements: {
              depends: [
                { RangePlugin: {} },
              ]
            },
          },
          {
            name: 'maxDays',
            default: null,
            type: 'number',
            configurable: true,
            requirements: {
              depends: [
                { RangePlugin: {} },
              ]
            },
          },
          {
            name: 'selectForward',
            default: false,
            type: 'boolean',
            configurable: true,
            requirements: {
              depends: [
                { RangePlugin: {} },
              ]
            },
          },
          {
            name: 'selectBackward',
            default: false,
            type: 'boolean',
            configurable: true,
            requirements: {
              depends: [
                { RangePlugin: {} },
              ]
            },
          },
          {
            name: 'presets',
            default: true,
            type: 'boolean',
            configurable: true,
            requirements: {
              depends: [
                { PresetPlugin: {} },
              ],
            },
          },
          {
            name: 'inseparable',
            default: false,
            type: 'boolean',
            configurable: true,
            requirements: {
              depends: [
                { RangePlugin: {} },
              ]
            },
          },
          {
            name: 'filter',
            configurable: false,
          },
        ],
      }
    ];
  }
}