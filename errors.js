const FS = require('fs');

// ERRORS
const readFile = (file = "file.txt") => {
    let data;
    try { data = FS.readFileSync(file, "utf8"); }
    catch (error) { console.error(error.toString()); }
    finally { console.log(data || `The file "${file}" could not be found!`); }
}

readFile();

// SCOPING
const scope = () => {
    let scope$variable = 10;
    const scope$constant = 20;
    const scope$function = () => {
        let function$variable = 30;
        const function$constant = 2 * scope$variable + scope$constant;
        console.log(scope$variable, scope$constant, scope$function, function$variable, function$constant);
    }
    try {
        scope$function();
        console.log(function$variable);
    } catch (error) { console.error(error.toString()); } // ReferenceError: function$variable is not defined
}

scope();