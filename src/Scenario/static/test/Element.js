import Element from '../Element';
import chai from 'chai';

const assert = chai.assert;

let element;
let count = 0;

describe('Element', () => {
   it('#new()', () => {
      element = new Element({
         on: {
            begin: () => { count++; },
            end: () => { count++; }
         }
      });

      element.name = '@nameElement';
      element.begin = true;
      element.name = 'test change name';
      element.end = true;

      assert(element.name, '@nameElement');
      assert(count, 2);
   });
});
