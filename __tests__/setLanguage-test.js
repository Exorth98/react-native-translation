import React from 'react';
import { Text } from 'react-native'

import { mount } from 'enzyme';

import { LanguageProvider, TransText, setLanguage } from '../src/index';
import { getTranslation } from '../src';


const translations = {
    juiceText : {
        "en-US" : "Let's drink some Juice, I have 1 bottle",
        "fr-FR" : "Buvons du jus, j'en ai 1 bouteille",
    }
}

class TestSetEN extends React.Component {
    constructor(props){
        super(props)
        setLanguage("en-US")
    }
    render(){
        return(<TransText dictionary = {translations.juiceText}/> )
    }
}

class TestSetFRfromNoContextDefault extends React.Component {
    constructor(props){
        super(props)
        setLanguage("fr-FR")
        this.text = getTranslation(translations.juiceText)
    }
    render(){
        return(<Text>{this.text}</Text>)
    }
}

  /*
* Testing with context
*/
describe('setLanguage normal use', () => {
    it('Should change language to en-US', () => {
      const wrapper = mount(
        <LanguageProvider language = {"fr-FR"}>
          <TestSetEN/>
        </LanguageProvider>
      )
      wrapper.mount();
      expect(wrapper.find(TransText).children().find(Text).text()).toContain("bottle");
    });
  });

    /*
* Testing without context
*/
describe('setLanguage normal use', () => {
    it('Should not change default language', () => {
      const wrapper = mount(
          <TestSetFRfromNoContextDefault/>
      )
      wrapper.mount();
      expect(wrapper.find(Text).text()).toContain("bottle");
    });
});