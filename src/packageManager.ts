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
      '<script src="https://cdn.jsdelivr.net/npm/@easepick/bundle@[version]/dist/index.umd.min.js"></script>',
    ],
  }
  public quickExampleHTML = `
  <span class="cp">&lt;!DOCTYPE html&gt;</span>
  <span class="nt">&lt;html&gt;</span>
    <span class="nt">&lt;head&gt;</span>
      <span class="nt">&lt;meta</span> <span class="na">charset=</span><span class="s">"utf-8"</span><span class="nt">&gt;</span>
      <span class="nt">&lt;title&gt;</span>easepick<span class="nt">&lt;/title&gt;</span>
      <span class="nt">&lt;script </span><span class="na">src=</span><span class="s">"https://cdn.jsdelivr.net/npm/@easepick/bundle@[version]/dist/index.umd.min.js"</span><span class="nt">&gt;&lt;/script&gt;</span>
    <span class="nt">&lt;/head&gt;</span>
    <span class="nt">&lt;body&gt;</span>
      <span class="nt">&lt;input</span> <span class="na">id=</span><span class="s">"datepicker"</span><span class="nt">/&gt;</span> [elementEnd]
      <span class="nt">&lt;script&gt;</span>
const picker = new easepick.create([config])
      <span class="nt">&lt;/script&gt;</span>
    <span class="nt">&lt;/body&gt;</span>
  <span class="nt">&lt;/html&gt;</span>`;

  constructor() {
    this.app = document.getElementById('app');
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
    language.className = 'language-bash extra-class';

    const pre = document.createElement('pre');
    pre.className = 'language-bash';

    const code = document.createElement('code');
    code.innerHTML = html;

    pre.appendChild(code);
    language.appendChild(pre);

    return language;
  }

  public npm2html(array) {
    return array.join("\n").replace(/npm install /g, ' <span class="token function">npm install</span> ');
  }

  public cdn2html(array, version) {
    return array.join("\n")
      .replace(/</g, '&lt;')
      .replace(/\[version\]/g, version)
      .replace(/\&lt;script /g, '<span class="nt">&lt;script </span>')
      .replace(/("https.+")/g, '<span class="s">$1</span>')
      .replace(/>\&lt;\/script>/g, '<span class="nt">>&lt;/script></span>');
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
    let html = this.quickExampleHTML;

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

      html = html.replace(/"datepicker"/, '"checkin"').replace(/\[elementEnd\]/, '<span class="nt">&lt;input</span> <span class="na">id=</span><span class="s">"checkout"</span><span class="nt">/&gt;</span>');
    }

    const config_json = JSON.stringify(config, null, 4)
      .replace(/"([^"]+)":/g, '$1:');

    const code = document.getElementById('quick-example-code');
    code.innerHTML = html
      //.replace(/</g, '&lt;')
      .replace(/^\s+/, '')
      .replace(/\s+$/, '')
      .replace(/\[version\]/g, version)
      .replace(/\[elementEnd\]/, '')
      .replace(/\[config\]/, config_json);
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