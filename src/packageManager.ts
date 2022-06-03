import { BasePkg } from './packages/base-pkg';
import { ISetup } from './interface';

export class PackageManager {
  public app: HTMLElement;
  public packages: BasePkg[] = [];
  public bundle: ISetup = {
    npm: [
      'npm install @easepick/bundle',
    ],
    cdn: [
      'https://cdn.jsdelivr.net/npm/@easepick/bundle@__VERSION__/dist/index.umd.min.js',
    ],
  }

  constructor() {
    this.app = document.getElementById('app-configurator');
  }

  public add(pkg: BasePkg) {
    this.packages.push(pkg);
  }

  public get(optionKey: string) {
    const idx = this.packages.findIndex(x => x.optionKey === optionKey);
    return this.packages[idx];
  }

  public renderHTML() {
    this.packages.forEach(pkg => {
      pkg.createTab();
      pkg.createTabContent();
    });
  }

  public createCodeHighlight(html) {
    const language = document.createElement('div');
    language.className = 'language-html extra-class';

    const pre = document.createElement('pre');
    pre.className = 'language-html';
    pre.innerHTML = html;

    language.appendChild(pre);

    return language;
  }

  public npm2html(array) {
    return array.join("\n").replace(/npm install /g, ' <span class="token function">npm install</span> ');
  }

  public cdn2html(array, version) {
    const code = document.getElementById('script-code-sample');
    return array.map(x => code.querySelector('code').innerHTML.replace(/__URL__/, x))
        .join("\n")
        .replace(/__VERSION__/g, version);
  }

  public npm() {
    let list = [];

    for (let pkg of this.packages) {
      if (!pkg.setup || !pkg.included) continue;

      list.push(...pkg.setup.npm);
    }

    return [...new Set(list)];
  }

  public cdn() {
    let list = [];

    for (let pkg of this.packages) {
      if (!pkg.setup || !pkg.included) continue;

      list.push(...pkg.setup.cdn);
    }

    return [...new Set(list)];
  }

  public quickExample(version, config) {
    let html = document.querySelector('#quick-example-sample code').innerHTML;

    if (typeof config.element !== 'string') {
      config.element = '#datepicker';
    }

    Object.keys(config).forEach(k => {
      if (/Plugin$/.test(k) && Object.keys(config[k]).length === 0) {
        delete config[k];
      }
    });


    if ('RangePlugin' in config && 'elementEnd' in config['RangePlugin']) {
      config['element'] = '#checkin';
      config['RangePlugin']['elementEnd'] = '#checkout';

      html = html.replace(/datepicker/, '"checkin"').replace(/__ELEMENT_END__/, '<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkout<span class="token punctuation">"</span></span><span class="token punctuation">/&gt;</span></span>');
    }

    const config_json = JSON.stringify(config, null, 4)
      .replace(/"([^"]+)":/g, '$1:');

    const code = document.getElementById('quick-example-code');
    code.innerHTML = html
      //.replace(/</g, '&lt;')
      .replace(/^\s+/, '')
      .replace(/\s+$/, '')
      .replace(/__VERSION__/g, version)
      .replace(/__SELFVERSION__/g, __VERSION__)
      .replace(/__ELEMENT_END__/, '')
      .replace(/__CONFIG__/, config_json);
  }

  public setupInfo(version: string, config) {
    const bundleNpm = document.getElementById('bundle-npm');
    bundleNpm.innerHTML = '';
    const bundleNpmCode = this.createCodeHighlight(this.npm2html(this.bundle.npm));
    bundleNpm.appendChild(bundleNpmCode);

    const bundleCdn = document.getElementById('bundle-cdn');
    bundleCdn.innerHTML = '';
    const bundleCdnCode = this.createCodeHighlight(this.cdn2html(this.bundle.cdn, version));
    bundleCdn.appendChild(bundleCdnCode);

    const modularNpm = document.getElementById('modular-npm');
    modularNpm.innerHTML = '';
    const modularNpmCode = this.createCodeHighlight(this.npm2html(this.npm()));
    modularNpm.appendChild(modularNpmCode);

    const modularCdn = document.getElementById('modular-cdn');
    modularCdn.innerHTML = '';
    const modularCdnCode = this.createCodeHighlight(this.cdn2html(this.cdn(), version));
    modularCdn.appendChild(modularCdnCode);

    this.quickExample(version, config);
  }

  public checkRequirements(config) {
    for (const pkg of this.packages) {
      if (!pkg.included) continue;

      for (const group of pkg.options) {
        if (!group.configurable) continue;

        for (const opt of group.children) {
          if (!opt.configurable) continue;
          if (!opt.requirements) continue;

          let reqValid = true;

          if (opt.requirements.depends instanceof Array) {
            for (const req of opt.requirements.depends) {
              reqValid = reqValid && this.objIncludes(config, req);
            }
          }

          if (opt.requirements.conflict instanceof Array) {
            for (const req of opt.requirements.conflict) {
              if (typeof req === 'function') {
                reqValid = reqValid && req(config);
              } else {
                reqValid = reqValid && !this.objIncludes(config, req);
              }
            }
          }

          opt.element.classList.toggle('unavailable', !reqValid);
        }
      }
    }
  }

  private objIncludes(obj, searchObj): boolean {
    for (const key of Object.keys(searchObj)) {
      if (searchObj[key] !== null
        && typeof searchObj[key] === 'object'
        && Object.keys(searchObj[key]).length > 0) {
        return key in obj && this.objIncludes(obj[key], searchObj[key]);
      }

      if (searchObj[key] !== null
        && typeof searchObj[key] === 'object'
        && Object.keys(searchObj[key]).length === 0) {
        return key in obj;
      }

      return key in obj && obj[key] === searchObj[key];
    }
  }
}