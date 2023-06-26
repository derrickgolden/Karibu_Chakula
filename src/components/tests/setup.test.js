
import Enzyme, { shallow, render, mount } from 'enzyme'
import toJson from 'enzyme-to-json';
// import Adapter from 'enzyme-adapter-react-16'
import ReactSixteenAdapter from 'enzyme-adapter-react-16';

// import CaloriesCard from "../CaloriesCard";
import BasicTest from '../BasicTest';

Enzyme.configure({ adapter: new ReactSixteenAdapter() })

describe("CaloriesCard component", () => {
    it('renders caloriesCard corrently', () =>{
        const wrapper = shallow(<BasicTest />)
        const hiddenState = wrapper.state().hidden
        expect(hiddenState).toEqual(false)
        // expect(toJson(wrapper)).toMatchSnapshot();
    })
})