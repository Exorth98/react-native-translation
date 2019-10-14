import React from 'react';
import { Text, Button } from 'react-native'

import { mount } from 'enzyme';

import { TranslationContext, LanguageProvider, TransText, getTranslation } from '../src/LanguageProvider';

const dictionary = {
    "en-US": "Press Me",
    "fr-FR": "Appuyer ici"
}

class TestClass extends React.Component {
    constructor(props){
        super(props)
        this.translatedText = "";
    }
    render(){
        this.translatedText = getTranslation(dictionary)
        return(
                <Button title={this.translatedText} onPress={()=>{}}/>
        )
    }
}

/*
* Test need improvement
*/
describe('LanguageProvider normal use', () => {
    it('Using getTranslation for button name', () => {
      const wrapper = mount(
        <LanguageProvider language = {"fr-FR"}>
          <TestClass/>
        </LanguageProvider>
      )
      wrapper.mount();
      expect(wrapper.find(Button).first().prop('title')).toBe("Appuyer ici");
    });
  });