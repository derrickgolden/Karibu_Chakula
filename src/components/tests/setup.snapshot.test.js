import renderer from "react-test-renderer";

import Header from "../Header";

// test("renders learn react link", () => {
//   const tree = renderer.create(<Header />).toJSON();
//   expect(tree).toMatchInlineSnapshot(`null`);
// });
describe('Testing sum', () => {
    function sum(a, b) {
       return a + b;
    }

    it('should equal 4',()=>{
       expect(sum(2,2)).toBe(4);
      })

    test('also should equal 4', () => {
        expect(sum(2,2)).toBe(4);
      }) 
});