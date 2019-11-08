const Base = require('./base');

class Test extends Base {
  constructor() {
    super();
  }

  static testGet() {
    console.log('test????')
  }
}

Test.testGet();
//Test.login();