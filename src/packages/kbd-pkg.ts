import { BasePkg } from './base-pkg';
import { IPackage } from '../interface';

export class KbdPkg extends BasePkg implements IPackage {
  public name = '@easepick/kbd-plugin';
  public description = 'Adds keyboard navigation.';
  public url = 'https://easepick.com/packages/kbd-plugin';
  public optionKey = 'KbdPlugin';
  public setup = {
    npm: [
      'npm install @easepick/core',
      'npm install @easepick/kbd-plugin',
    ],
    cdn: [
      'https://cdn.jsdelivr.net/npm/@easepick/datetime@__VERSION__/dist/index.umd.min.js',
      'https://cdn.jsdelivr.net/npm/@easepick/core@__VERSION__/dist/index.umd.min.js',
      'https://cdn.jsdelivr.net/npm/@easepick/base-plugin@__VERSION__/dist/index.umd.min.js',
      'https://cdn.jsdelivr.net/npm/@easepick/kbd-plugin@__VERSION__/dist/index.umd.min.js',
    ],
  }

  public fillOptions() {
    this.options = [
      {
        configurable: true,
        children: [
          {
            name: 'unitIndex',
            default: 1,
            type: 'number',
            configurable: true,
          },
          {
            name: 'dayIndex',
            default: 2,
            type: 'number',
            configurable: true,
          },
        ],
      }
    ];
  }
}