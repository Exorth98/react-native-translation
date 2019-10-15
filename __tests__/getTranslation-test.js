import React from 'react';
import { Text, Button } from 'react-native'

import { mount } from 'enzyme';

import { LanguageProvider, TranslationConsumer, getTranslation, getTranslationWithLang } from '../src/LanguageProvider';

const dictionary = {
    "en-US": "Press Me",
    "fr-FR": "Appuyer ici"
}

class TestClassNormal extends React.Component {
    constructor(props){
        super(props)
        this.translatedText = getTranslation(dictionary)
    }
    render(){
        return(<Button title={this.translatedText} onPress={()=>{}}/>)
    }
}

class TestClassWrongDic extends React.Component {
  constructor(props){
      super(props)
      this.translatedText = getTranslation(undefined)
  }
  render(){   
      return(<Button title={this.translatedText} onPress={()=>{}}/>)
  }
}

class TestClassNormalConsumer extends React.Component {
  constructor(props){
      super(props)
  }
  render(){
      return(
      <TranslationConsumer>
        {({ language }) => {
          let translatedText = getTranslationWithLang(language,dictionary)
          return(<Button title={translatedText} onPress={()=>{}}/>)
        }}
      </TranslationConsumer>
      )
  }
}

/*
* Testing normal use
*/
describe('LanguageProvider normal use', () => {
    it('Using getTranslation for button name normal', () => {
      const wrapper = mount(
        <LanguageProvider language = {"fr-FR"}>
          <TestClassNormal/>
        </LanguageProvider>
      )
      wrapper.mount();
      expect(wrapper.find(Button).first().prop('title')).toBe("Appuyer ici");
    });
  });

/*
* Testing normal use no remount
*/
/*describe('LanguageProvider normal use', () => {
  it('Using getTranslation for button name normal no remount', () => {
    const wrapper = mount(
      <LanguageProvider language = {"fr-FR"}>
        <TestClassNormal/>
      </LanguageProvider>
    )
    expect(wrapper.find(Button).first().prop('title')).toBe("Press Me");
  });
});*/

/*
* Testing wrong dic
*/
describe('LanguageProvider normal use', () => {
  it('Using getTranslation for button name wrong dic', () => {
    const wrapper = mount(
      <LanguageProvider language = {"fr-FR"}>
        <TestClassWrongDic/>
      </LanguageProvider>
    )
    wrapper.mount();
    expect(wrapper.find(Button).first().prop('title')).toBe("Error");
  });
});

/*
* Testing no Language
*/
describe('LanguageProvider normal use', () => {
  it('Using getTranslation for button name no language', () => {
    const wrapper = mount(
      <LanguageProvider>
        <TestClassNormal/>
      </LanguageProvider>
    )
    wrapper.mount();
    expect(wrapper.find(Button).first().prop('title')).toBe("Press Me");
  });
});

/*
* Testing with languageConsumer
*/
describe('LanguageProvider normal use', () => {
  it('Using getTranslation for button name with consumer', () => {
    const wrapper = mount(
      <LanguageProvider language = {"fr-FR"}>
        <TestClassNormalConsumer/>
      </LanguageProvider>
    )
    wrapper.mount();
    expect(wrapper.find(Button).first().prop('title')).toBe("Appuyer ici");
  });
});