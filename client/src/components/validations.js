
function validate(input){
    let {title, summary, healthScore, analyzedInstructions, img, diet} = input;
    let whitespacesParameter =  /(?!^\s+$)^.*$/m;
    let alphabeticalPattern = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
    let emailPattern = /\S\@\S+\S+/; // Expresion Regular para validar Emails.
    let oneTo100Parameter = /^[1-9]$|^[1-9][0-9]$|^(100)$/;

    let errors = {};
    //---------- Title Start ----------//
        if(!title) errors.title = 'A Title is required';
        if(!whitespacesParameter.test(title)) errors.title = 'No whitespaces allowed';
        if(emailPattern.test(title)) errors.title = 'Title can not have an email pattern';
        if(title.includes("@")) errors.title = 'Title can not have @';
        if(!alphabeticalPattern.test(title)) errors.title = 'Title must has only alphabetical characters. Example: ñoñerías, French Fries, Soup number One etc';
    //---------- Title End ----------//

    //---------- Summary Start ----------//
        if(!summary) errors.summary = 'A Summary is required';
        if(!whitespacesParameter.test(summary)) errors.summary = 'No whitespaces allowed';
        if(emailPattern.test(summary)) errors.summary = 'Summary can not have an email pattern';
        if(summary.includes("@")) errors.summary = 'Summary can not have @';
        if(summary.length <= 20 || summary.length >= 800) errors.summary = 'Summary must have between 20 and 800 characters';
    //---------- Summary End ----------//

    //---------- Health score Start ----------//
        if(!oneTo100Parameter.test(healthScore)) errors.healthScore = 'Health Score should be between 1 and 100';
    //---------- Health score End ----------//

    //---------- Img Start ----------//
    if(img === '') errors.img = 'Please, add an image';
    //---------- Img End ----------//


    return errors;
}

module.exports = {
    validate,
}