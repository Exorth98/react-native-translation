import React from 'react';
import { Text, Button } from 'react-native'

import { mount } from 'enzyme';

import { LanguageProvider, TranslationConsumer, getTranslation, getTranslationWithLang } from '../src/LanguageProvider';



const name = "Joe"

const translations = {
  dictionary : {
    "en-US" : "Press Me",
    "fr-FR" : "Appuyer ici"
  },
  otherMessages : {
    namedMessage : {
      "en-US" : "Hello {name} !",
      "fr-FR" : "Salut {name} !"
    },
  }
}

class TestClassNormal extends React.Component {
    constructor(props){
        super(props)
        this.translatedText = getTranslation(translations.dictionary)
    }
    render(){
        return(<Button title={this.translatedText} onPress={()=>{}}/>)
    }
}

class TestClassNormalBase extends React.Component {
  constructor(props){
      super(props)
      this.translatedText = getTranslation("otherMessages.namedMessage",{"name":name})
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
          let translatedText = getTranslationWithLang(language,translations.dictionary)
          return(<Button title={translatedText} onPress={()=>{}}/>)
        }}
      </TranslationConsumer>
      )
  }
}

class TestClassWithLangNoProvider extends React.Component {
  constructor(props){
      super(props)
  }
  render(){
      let translatedText = getTranslationWithLang(undefined,translations.dictionary)
      return(
          <Button title={translatedText} onPress={()=>{}}/>
      )
  }
}

/*
* Testing normal use
*/
describe('GetTranslation normal use', () => {
    it('should render using getTranslation for button name normal', () => {
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
* Testing wrong dic
*/
describe('GetTranslation normal use', () => {
  it('Should render using getTranslation for button name wrong dic', () => {
    const wrapper = mount(
      <LanguageProvider language = {"fr-FR"}>
        <TestClassWrongDic/>
      </LanguageProvider>
    )
    wrapper.mount();
    expect(wrapper.find(Button).first().prop('title')).toBe("Error 1");
  });
});

/*
* Testing no Language
*/
describe('GetTranslation normal use', () => {
  it('Should render using getTranslation for button name no language', () => {
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
describe('GetTranslation normal use', () => {
  it('Should render using getTranslation for button name with consumer', () => {
    const wrapper = mount(
      <LanguageProvider language = {"fr-FR"}>
        <TestClassNormalConsumer/>
      </LanguageProvider>
    )
    wrapper.mount();
    expect(wrapper.find(Button).first().prop('title')).toBe("Appuyer ici");
  });
});

/*
* Testing normal use with constant dic base
*/
describe('GetTranslation normal use', () => {
  it('Should render using getTranslation for button name normal', () => {
    const wrapper = mount(
      <LanguageProvider language = {"fr-FR"} translations={translations}>
        <TestClassNormalBase/>
      </LanguageProvider>
    )
    wrapper.mount();
    expect(wrapper.find(Button).first().prop('title')).toBe("Salut Joe !");
  });
});

/*
* Testing normal use with constant dic base but use of object dictionary
*/
describe('GetTranslation normal use', () => {
  it('Should render using getTranslation for button name normal with base particular case object', () => {
    const wrapper = mount(
      <LanguageProvider language = {"fr-FR"} translations={translations}>
        <TestClassNormal/>
      </LanguageProvider>
    )
    wrapper.mount();
    expect(wrapper.find(Button).first().prop('title')).toBe("Appuyer ici");  });
});

/*
* Testing normal use with no provider
*/
describe('GetTranslation normal use', () => {
  it('Should render default with no provider', () => {
    const wrapper = mount(
        <TestClassNormal/>
    )
    wrapper.mount();
    expect(wrapper.find(Button).first().prop('title')).toBe("Press Me");  });
});

/*
* Testing withLang via consumer with no provider
*/
describe('GetTranslation normal use', () => {
  it('Should render default with no provider', () => {
    const wrapper = mount(
        <TestClassWithLangNoProvider/>
    )
    wrapper.mount();
    expect(wrapper.find(Button).first().prop('title')).toBe("Press Me");  });
});