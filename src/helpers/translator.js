import {getSubObject} from './utils'


function Translator(translations,defaultLanguage){
    this.translations = translations
    this.defaultLanguage = defaultLanguage
    
    this.translate = function(language, dictionary, values){

        // Search for translation
        let text = ""
        if(typeof dictionary == 'string'){
            text = constantDictionaryReader(this.defaultLanguage,language,dictionary,this.translations)
        }
        else{
            text = dynamicDictionaryReader(this.defaultLanguage,language,dictionary)
        }
        // Injecting variables values
        if(text.includes('{')){
            Object.keys(values).forEach(key => {
                text = text.replace(`{${key}}`,values[key]);
            });  
        }

        return text;
    }

    /*
    Use the provided dictionary to return the data in the correct language
    */
    this.redirect = function(language, dictionary){
        let rep = {};
        if (dictionary){
            if (dictionary[language]){
                rep = dictionary[language];
            }
            else if(dictionary[this.defaultLanguage]){
                rep = dictionary[this.defaultLanguage];
            }
        }
        return rep;
    };
}

const constantDictionaryReader = (defaultLanguage,language,dictionary,translationObject) => {
    let dic = getSubObject(translationObject,dictionary);
    if (dic){
        if(dic[language]){
            return dic[language]
        }
        else if (dic[defaultLanguage]){
            return dic[defaultLanguage]
        }
        return "Error 4" // Language AND default language not found on dictionary
    }
    else{
      return "Error 2"; // invalid path or dictionary
    }
}

const dynamicDictionaryReader = (defaultLanguage,language,dictionary) => {
        
    if (dictionary){
        if(dictionary[language]){
            return dictionary[language]
        }
        else if (dictionary[defaultLanguage]){
            return dictionary[defaultLanguage]
        }
        else return "Error 3" // Language AND default language not found on dictionary
    }
    else{
        return "Error 1"; // invalid Dictionary object
    }
} 

export{
    Translator
}