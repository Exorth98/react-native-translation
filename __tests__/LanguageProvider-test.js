import { Text, Button, Animated } from 'react-native'
import React from 'react';

import { mount } from 'enzyme';
import {act} from 'react-dom/test-utils';

import { LanguageProvider, TranslationConsumer, TransText, AnimatedTransText } from '../src/index';

const jsonDic = require("./someJsonDictionary.json")

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
const translations = {
  namedMessage : {
    "en-US" : "Hello {name} !",
    "fr-FR" : "Salut {name} !"
  },
  otherMessages : {
    unnamedMessage : {
      "en-US" : "Hello !",
      "fr-FR" : "Salut !"
    },
    unnamedBrokenMessage : {
      "es-ES" : "Hola !",
      "fr-FR" : "Salut !"
    }
  }
}

/*
* Providing language different than default fallback language
* using transtex providing dictionary no values
*/
describe('LanguageProvider normal use', () => {
  it('Should render with provided langu dic', () => {
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
describe('LanguageProvider normal use with values', () => {
  it('Should render with provided langu dic and values', () => {
    const wrapper = mount(
      <LanguageProvider language={"en-US"}>
            <TransText dictionary = {varDic} values = {{"name":name}}/>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Hello Joe !");
  });
});

/*
* Providing no language
* using TransText providing dictionary and values
*/
describe('LanguageProvider no language', () => {
  it('Should render with provided langu dic and values', () => {
    const wrapper = mount(
      <LanguageProvider>
            <AnimatedTransText dictionary = {varDic} values = {{"name":name}}/>
      </LanguageProvider>
    )
    expect(wrapper.find(AnimatedTransText).children().find(Animated.Text).text()).toContain("Hello Joe !");
  });
});


/*
* Providing only default language
* using TransText providing dictionary and values
*/
describe('LanguageProvider only default language', () => {
  it('Should render with provided langu dic and values', () => {
    const wrapper = mount(
      <LanguageProvider defaultLanguage="en-US">
            <AnimatedTransText dictionary = {varDic} values = {{"name":name}}/>
      </LanguageProvider>
    )
    expect(wrapper.find(AnimatedTransText).children().find(Animated.Text).text()).toContain("Hello Joe !");
  });
});

/*
* Providing language
* using AnimatedTransText providing dictionary and values
*/
describe('LanguageProvider animated transtext normal use', () => {
  it('Should render with provided langu dic and values', () => {
    const wrapper = mount(
      <LanguageProvider language={"en-US"}>
            <AnimatedTransText dictionary = {varDic} values = {{"name":name}}/>
      </LanguageProvider>
    )
    expect(wrapper.find(AnimatedTransText).children().find(Animated.Text).text()).toContain("Hello Joe !");
  });
});

/*
* Providing language
* using AnimatedTransText providing dictionary
*/
describe('LanguageProvider animated transtext normal use', () => {
  it('Should render with provided langu dic', () => {
    const wrapper = mount(
      <LanguageProvider language={"en-US"}>
            <AnimatedTransText dictionary = {simpleDic}/>
      </LanguageProvider>
    )
    expect(wrapper.find(AnimatedTransText).children().find(Animated.Text).text()).toContain("Hello !");
  });
});

/*
* Providing wrong language but good fallback Language
* using transtex providing dictionary no values
*/
describe('LanguageProvider transtext wrong language', () => {
  it('Should render providing wrong language but good fallback Language', () => {
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
describe('LanguageProvider transtext wrong language and no default', () => {
  it('Should render with wrong language and no/wrong fallback language', () => {
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
describe('LanguageProvider transtex wrong dictionary', () => {
  it('Should render with wrong dictionary (language not found)', () => {
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
describe('LanguageProvider and Consumer in-app language change', () => {
  it('should render and rerender with in-app language change', () => {
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

/*
* Providing constant base dictionary
* using transtex providing dictionary and values
*/
describe('LanguageProvider constant dictionary', () => {
  it('should render transleted text from constant translation object', () => {
    const wrapper = mount(
      <LanguageProvider language="en-US" translations={translations}>
            <TransText dictionary = "namedMessage" values={{"name":name}}/>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Hello Joe !");
  });
});

/*
* Providing constant base dictionary
* using transtex providing concatained dictionary and values
*/
describe('LanguageProvider constant dictionary', () => {
  it('should render transleted text from constant translation object', () => {
    const wrapper = mount(
      <LanguageProvider language="fr-FR" translations={translations}>
            <TransText dictionary = "otherMessages.unnamedMessage"/>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Salut !");
  });
});


/*
* Providing constant base dictionary
* using transtex with wrong path
*/
describe('LanguageProvider constant dictionary wrong path', () => {
  it('should render error text from constant translation object', () => {
    const wrapper = mount(
      <LanguageProvider language="fr-FR" translations={translations}>
            <TransText dictionary = "otherMessages.oopsIFailed"/>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Error");
  });
});

/*
* Providing constant base dictionary
* using transtex providing concatained dictionary and values
*/
describe('LanguageProvider constant base', () => {
  it('should render default text from constant translation object', () => {
    const wrapper = mount(
      <LanguageProvider language="es-ES" translations={translations}>
            <TransText dictionary = "otherMessages.unnamedMessage"/>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Hello !");
  });
});

/*
* Providing constant base dictionary wrong language and 
* using transtex providing concatained dictionary and values
*/
describe('LanguageProvider constant base wrong language', () => {
  it('should render error text from constant translation object whith wrong dic', () => {
    const wrapper = mount(
      <LanguageProvider language="oops" translations={translations}>
            <TransText dictionary = "otherMessages.unnamedBrokenMessage"/>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Error");
  });
});



/*
* Providing constant base JSON dictionary
* using transtex providing concatained dictionary and values
*/
describe('LanguageProvider constant JSON dictionary', () => {
  it('should render transleted text from constant translation object', () => {
    const wrapper = mount(
      <LanguageProvider language="fr-FR" translations={jsonDic}>
            <TransText dictionary = "otherMessages.unnamedMessage"/>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Salut !");
  });
});

/*
* Providing constant base JSON dictionary
* using transtex providing concatained dictionary and values
*/
describe('LanguageProvider constant JSON base', () => {
  it('should render default text from constant translation object', () => {
    const wrapper = mount(
      <LanguageProvider language="es-ES" translations={jsonDic}>
            <TransText dictionary = "otherMessages.unnamedMessage"/>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Hello !");
  });
});




