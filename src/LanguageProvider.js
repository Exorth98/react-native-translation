import React, { useState, useEffect } from 'react';
import { Animated, Text} from 'react-native';
import propTypes  from 'prop-types';

const TranslationContext = React.createContext();
const TranslationConsumer = TranslationContext.Consumer;

let defaultLanguage = "";
/*
Use the provided dictionary and values
to generate the transleted text
*/
const translate = (language, dictionary, values) =>{
  // TODO : Improve errors checking
  if (dictionary == undefined) return "Error"
  if (dictionary[language] == undefined){
    language = defaultLanguage;
    if(dictionary[language] == undefined) return "Error"
  }
  let text = dictionary[language]
  Object.keys(values).forEach(key => {
    text = text.replace(`{${key}}`,values[key])
  });
  return text;
}

/*
Language provider component
Provide context for translation
*/
const LanguageProvider = props => {

    defaultLanguage = props.defaultLanguage;
    let locale = props.language !== undefined ? props.language : defaultLanguage;

    const [language, updateLanguage] = useState(locale);

    return (
      <TranslationContext.Provider value={{language, defaultLanguage, updateLanguage}}>
        {props.children}
      </TranslationContext.Provider>
    );
}

/*
TransText component
Return a regular Text component with translated message thanks to the dictionnary
*/
const TransText = props => {

  let values = props.values != undefined ? props.values : {}
  return (
    <TranslationConsumer>
      {({ language, defaultLanguage }) => {
        let text = translate(language, props.dictionary, values)
        return (<Text {...props}>{text}</Text>)
      }}
    </TranslationConsumer>
  )
};

/*
AnimatedTransText component
Works like Transtext, but can handle the proporties for animated text
*/
const AnimatedTransText = props => {

  let values = props.values != undefined ? props.values : {}
  return (
    <TranslationConsumer>
      {({ language }) => {
        let text = translate(language, props.dictionary, values)
        return (<Animated.Text {...props}>{text}</Animated.Text>)
      }}
    </TranslationConsumer>
  )
};

/*
This function is called to get a translation needed outside a Text component in the render function
*/
const getTranslation = (dictionary, values = {}) => {

  let contextValue = TranslationContext._currentValue
  let language = contextValue != undefined ? contextValue.language : "en-US"
  let text = translate(language, dictionary,values)
  return text;
}

LanguageProvider.propTypes = {
  language: propTypes.string.isRequired,
  defaultLanguage: propTypes.string
}
LanguageProvider.defaultProps = {
  language: "en-US",
  defaultLanguage: "en-US"
}

TransText.propTypes = {
  dictionary: propTypes.object.isRequired,
  values: propTypes.object
}
TransText.defaultProps = {
  dictionary: {},
  values: {}
}


AnimatedTransText.propTypes = {
  dictionary: propTypes.object.isRequired,
  values: propTypes.object
}
AnimatedTransText.defaultProps = {
  dictionary: {},
  values: {}
}


export {
  TranslationContext,
  LanguageProvider,
  TranslationConsumer,
  TransText,
  AnimatedTransText,
  getTranslation
}