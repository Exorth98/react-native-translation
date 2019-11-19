import React from 'react';
import { Text } from 'react-native'

import { mount } from 'enzyme';

import { LanguageProvider, getLanguage } from '../src/index';

class TestSetEN extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          language: getLanguage()
        }
    }
    render(){
        return(<></>)
    }
}

  /*
* Testing with context
*/
describe('getLanguage normal use', () => {
    it('Should return language fr-FR', () => {
      const wrapper = mount(
        <LanguageProvider language = {"fr-FR"}>
          <TestSetEN/>
        </LanguageProvider>
      )
      wrapper.mount();
      expect(wrapper.find(TestSetEN).first().state('language')).toEqual("fr-FR");
    });
  });

    /*
* Testing without context
*/
describe('setLanguage normal use', () => {
    it('Should return default language', () => {
      const wrapper = mount(
          <TestSetEN/>
      )
      wrapper.mount();
      expect(wrapper.state('language')).toEqual("en-US");
    });
});