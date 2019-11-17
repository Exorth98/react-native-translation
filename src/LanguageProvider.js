import React, { useState, useEffect } from 'react';
import { Animated, Text} from 'react-native';
import propTypes  from 'prop-types';

const TranslationContext = React.createContext();
const TranslationConsumer = TranslationContext.Consumer;

let defaultLanguage = "";

// Search subObject from path
const getSubObject = (obj, path) => {
  var paths = path.split('.')
  current = obj
  for (i = 0; i < paths.length; i++)
    if (current[paths[i]] != undefined)current = current[paths[i]]
    else return undefined
  return current;
}

/*
Use the provided dictionary and values
to generate the transleted text
*/
const translate = (language, translationObject, dictionary, values) =>{
  let text = "Error"
  if (dictionary == undefined) return (text+" 1")
  if (translationObject === null) text+=" 5"

  //Using a unique provided translation object
  if(typeof dictionary === 'string' && translationObject !== null){
    dic = getSubObject(translationObject,dictionary)
    if (dic != undefined){
      if (dic[language] == undefined){
        language = defaultLanguage;
        dic = getSubObject(translationObject,dictionary)
        if (dic[language] != undefined ) text = dic[language];
        else return (text+" 3")
      }
      else text = dic[language]
    }
    else{
      return (text+" 2")
    }

  }
  //Providing translation object in dictionnary
  else{
    
    if (dictionary[language] == undefined){
      language = defaultLanguage;
      if(dictionary[language] == undefined) return (text+" 4")
    }
    text = dictionary[language]
  }
  // Injecting variables values
  if(text.includes('{')){
    Object.keys(values).forEach(key => {
      text = text.replace(`{${key}}`,values[key])
    });  
  }

  return text;
}


const redirection = (language, dictionary) => {
  rep = {}
  if (dictionary !== undefined){
    if (dictionary[language] !== undefined){
      rep = dictionary[language]
    }
    else{
      language = defaultLanguage;
      if(dictionary[language] !== undefined){
        rep = dictionary[language]
      }
    }
  }
  return rep
}

/*
Language provider component
Provide context for translation
*/
const LanguageProvider = props => {

    defaultLanguage = props.defaultLanguage;
    let translationObject = props.translations;

    const [language, updateLanguage] = useState(props.language);

    return (
      <TranslationContext.Provider value={{language, updateLanguage, translationObject}}>
        {props.children}
      </TranslationContext.Provider>
    );
}

/*
TransText component
Return a regular Text component with translated message thanks to the dictionnary
*/
const TransText = props => {
  return (
    <TranslationConsumer>
      {({ language, translationObject }) => {
        let text = translate(language, translationObject, props.dictionary, props.values)
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
  return (
    <TranslationConsumer>
      {({ language, translationObject }) => {
        let text = translate(language, translationObject, props.dictionary, props.values)
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
  let language = contextValue != undefined ? contextValue.language : defaultLanguage
  let translationObject = contextValue != undefined ? contextValue.translationObject : null
  let text = translate(language, translationObject, dictionary,values)
  //let text = translate(contextValue.language, dictionary,values)
  return text;
}

const getRedirection = dictionary => {
  let contextValue = TranslationContext._currentValue
  let language = contextValue != undefined ? contextValue.language : defaultLanguage

  let rep = redirection(language, dictionary)
  return rep;
}

const getTranslationWithLang = (language, dictionary, values = {}) => {
  let contextValue = TranslationContext._currentValue
  let translationObject = contextValue != undefined ? contextValue.translationObject : null
  return text = translate(language, translationObject, dictionary,values)
}

LanguageProvider.propTypes = {
  language: propTypes.string.isRequired,
  defaultLanguage: propTypes.string,
  translations: propTypes.object
}
LanguageProvider.defaultProps = {
  language: "en-US",
  defaultLanguage: "en-US",
  translations: null,
}

TransText.propTypes = {
  dictionary: propTypes.oneOfType([propTypes.object,propTypes.string]).isRequired,
  values: propTypes.object
}
TransText.defaultProps = {
  dictionary: {},
  values: {}
}


AnimatedTransText.propTypes = {
  dictionary: propTypes.oneOfType([propTypes.object,propTypes.string]).isRequired,
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
  getTranslation,
  getTranslationWithLang,
  getRedirection,
}