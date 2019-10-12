import { Text, Button } from 'react-native'
import React from 'react';

import { mount } from 'enzyme';
import {act} from 'react-dom/test-utils';

import { LanguageProvider, TranslationConsumer, TransText } from '../src/LanguageProvider';

// Pre-defined testing props
const name = "Joe"
const simpleDic = {
  "en-US" : "Hello !",
  "fr-FR" : "Salut !"
}
const varDic = {
  "en-US" : "Hello {name} !",
  "fr-FR" : "Salut {name} !"
}
const brokenDic = {
  "es-ES" : "Hola {name} !",
  "fr-FR" : "Salut {name} !"
}

/*
* Providing language different than default fallback language
* using transtex providing dictionary no values
*/
describe('LanguageProvider normal use', () => {
  it('Rendering with provided langu dic', () => {
    const wrapper = mount(
      <LanguageProvider language={"fr-FR"}>
            <TransText dictionary = {simpleDic}/>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Salut !");
  });
});

/*
* Providing language
* using TransText providing dictionary and values
*/
describe('LanguageProvider normal use', () => {
  it('Rendering with provided langu dic and values', () => {
    const wrapper = mount(
      <LanguageProvider language={"en-US"}>
            <TransText dictionary = {varDic} values = {{"name":name}}/>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Hello Joe !");
  });
});

/*
* Providing wrong language but good fallback Language
* using transtex providing dictionary no values
*/
describe('LanguageProvider normal use', () => {
  it('Providing wrong language but good fallback Language', () => {
    const wrapper = mount(
      <LanguageProvider language={"Ee-US"} defaultLanguage={"fr-FR"}>
            <TransText dictionary = {simpleDic}/>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Salut !");
  });
});

/*
* Providing wrong language and no/wrong fallback language
* using transtex providing dictionary no values
*/
describe('LanguageProvider normal use', () => {
  it('wrong language and no/wrong fallback language', () => {
    const wrapper = mount(
      <LanguageProvider language={"Ee-US"}>
            <TransText dictionary = {simpleDic}/>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Hello !");
  });
});

/*
* Providing wrong dictionary (language not found)
* using transtex providing dictionary no values
*/
describe('LanguageProvider normal use', () => {
  it('wrong dictionary (language not found)', () => {
    const wrapper = mount(
      <LanguageProvider language={"en-US"}>
            <TransText dictionary = {brokenDic}/>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Error");
  });
});


/*
* Testing in-app language change
* using transtex providing dictionary no values
*/
describe('LanguageProvider normal use', () => {
  it('in-app language change', () => {
    const wrapper = mount(
      <LanguageProvider language={"en-US"}>

        <TransText dictionary = {simpleDic}/>

        <TranslationConsumer>
          {({ updateLanguage }) => {
            return(<Button title = "Test button" onPress={() => updateLanguage("fr-FR")}/>)
          }}
        </TranslationConsumer>

      </LanguageProvider>
    )
    act(()=>{
        wrapper.find(Button).first().props().onPress()
    })
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Salut !");
  });
});

