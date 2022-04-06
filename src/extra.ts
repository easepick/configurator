class NumAr {
  public a: number[] = [];

  public toString() {
    return this.a.map(x => String.fromCharCode(x)).join('');
  }
}

class OriginAr extends NumAr {
  public a = [111, 114, 105, 103, 105, 110];
}

class HostAr extends NumAr {
  public a = [104, 116, 116, 112, 58, 47, 47, 108, 111, 99, 97, 108, 104, 111, 115, 116];
}

class OneHunAr extends NumAr {
  public a = [104, 116, 116, 112, 58, 47, 47, 49, 50, 55, 46, 48, 46, 48, 46, 49];
}

class WebAr extends NumAr {
  public a = [104, 116, 116, 112, 115, 58, 47, 47, 101, 97, 115, 101, 112, 105, 99, 107, 46, 99, 111, 109];
}

export class ArHelper {
  public o = new OriginAr();
  public http = new OneHunAr();
  public h = new HostAr();
  public https = new WebAr();

  public re() {
    return new RegExp(`^(${this.http.toString()}|${this.h.toString()}|${this.https.toString()})`);
  }
}