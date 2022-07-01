function postRecipeValidation(data){

    let { title, img, summary, healthScore, analyzedInstructions, diet } = data;
    
    if(title){
        let type = 'Title';       
        hasNotWhiteSpaces(type, title);
        mustBeOnlyAlphabetical(type, title);
        mustBeString(type, title);
        cantBeEmail(type, title);
    }
    else cantBeEmpty('Title');

    if(img){
        let type = 'Img';
        mustBeString(type, title);
        cantBeEmail(type, title);
    }
    if(summary){
        let type = 'Summary';
        hasNotWhiteSpaces(type, summary);
        mustBeString(type, summary);
        cantBeEmail(type, summary);
    } else cantBeEmpty('Summary');

    if(healthScore){
        let type = 'Health Score';
        hasNotWhiteSpaces(type, healthScore);
        //mustBeANumber(type, healthScore);
        cantBeEmail(type, healthScore);
        mustBeBetweeen1To100(type, healthScore)
    } else mustBeBetweeen1To100('Health Score', healthScore);

    //Cuando se pueda, mejorar la validación del steps ya que es un objeto
    // Se puede hacer como en recipe.js del routes
    if(analyzedInstructions){
        let type = 'Steps';
        cantBeEmail(type, analyzedInstructions);
        //mustBeString(type, analyzedInstructions);
    }

    //Si el array está vacio, throw new Error en el else
    if(diet.length > 0){
        let type = 'Diet Types';
        hasNotWhiteSpaces(type, diet);
        //mustBeOnlyAlphabetical(type, diet);
        //mustBeString(type, diet);
        cantBeEmail(type, diet);
    }else throw new Error (`The Diet Types is empty, the input cannot be empty`);


}

function getRecipeByUUIDValidation(data){
    let {id} = data;

    if(id){
        let type = 'UUID';        
        hasNotWhiteSpaces(type, id);
        mustBeString(type, id);
        mustBeUUID(type, id)
    }
}

function getRecipesValidation(data){
    let { title } = data;
    
    if(title){
        let type = 'Title';       
        hasNotWhiteSpaces(type, title);
        mustBeOnlyAlphabetical(type, title);
        mustBeString(type, title);
        cantBeEmail(type, title);
    }
}

// function getRecipeByIdValidation(data){
//     let {id} = data;
//     if(id){
//         let type = 'id';
//         mustBeId(type, id);
//     }
// }

// function mustBeId(type, parameter){
//     let idParameter = /^[0-9]+$/;
//     if(!idParameter.test(parameter)){
//         throw new Error (`The ${type} is: ${parameter} which is not a valid id. Example of valid id: 660306, 77017, etc`);
//     }
// }

function mustBeUUID(type, parameter){
    // Validate a UUID V4:
    let UUIDParameter = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    if(!UUIDParameter.test(parameter)){
        throw new Error (`The ${type} is not a valid UUID`);
    }
}


function hasNotWhiteSpaces(type, parameter){    
    // https://regexland.com/regex-not-only-whitespace/#:~:text=A%20regex%20to%20match%20a,%2Dwhitespace%20character%20(%5CS).
    let whitespacesParameter =  /(?!^\s+$)^.*$/m
    if(!whitespacesParameter.test(parameter)){
        throw new Error (`In the ${type} there's one or several whitespaces, the input must not have whitespaces`);
    }
}
//Si el array tiene 2 indices pero uno es un string vacio, no sirve la validación. Cuando se pueda, se debe mejorar eso
function cantBeEmpty(type, parameter){
    throw new Error (`The ${type} is empty, the input cannot be empty`);
}

function mustBeOnlyAlphabetical(type, parameter){
    // ^representa inicio de la cadena
    // * representa que se pueda repetir letras desde la a-z Z-A
    // el espacio despues de la Z representa que se admiten espacios entre caracteres
    // Acá permito letras del abcdario, tildes y la letra ñ
    let alphabeticalPattern = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
    if(!alphabeticalPattern.test(parameter)){
        throw new Error (`The ${type} is: ${parameter}, must has only alphabetical letters, ñ letter and or tildes or accents. Example: ñoñerías, French Fries, Soup number One etc`);
    }
}

function mustBeString(type, parameter){
    if(typeof parameter !== 'string'){
        throw new Error(`${type} is: ${parameter}, must be a string`);
    }
}

function mustBeANumber(type, parameter){
    if(typeof parameter !== 'number'){
        throw new Error(`${type} is: ${parameter}, must be a number`);
    }
}

function cantBeEmail(type, parameter){
    var emailPattern = /\S\@\S+\S+/; // Expresion Regular para validar Emails.
    if(emailPattern.test(parameter)){
        throw new Error (`The ${type} is: ${parameter}, should not has an email pattern`);
    }
}

function mustBeBetweeen1To100(type, parameter){
    let oneTo100Parameter = /^[1-9]$|^[1-9][0-9]$|^(100)$/;
    if(parameter === 0){
        throw new Error (`The ${type} is: ${parameter}, Health Score cannot be 0 should be between 1 and 100`);
    } 
    if(!oneTo100Parameter.test(parameter)){
        throw new Error (`The ${type} is: ${parameter}, Health Score should be between 1 and 100`);
    }
}

module.exports = {
    postRecipeValidation,
    getRecipeByUUIDValidation,
    getRecipesValidation,
};