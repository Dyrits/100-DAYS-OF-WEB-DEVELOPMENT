import FS from "fs";
import FSP from "fs/promises";


const readFile = (file = "data.txt") => {
    let data;
    try { data = FS.readFileSync(file, "utf8"); }
    catch (error) { console.error(error.toString()); }
    finally { console.log(data || `The file "${file}" could not be found!`); }
}

// readFile();

const readFileAsync = (file = "data.txt") => {
    FS.readFile(file, "utf8", (error, data) => {
        if (error) { console.error(error.toString()); }
        else { console.log(data || `The file "${file}" could not be found!`); }
    });
    console.log("Reading file...");
}

// readFileAsync()

const readFilePromise = (file = "data.txt") => {
    FSP.readFile(file, "utf8")
        .then(data => { console.log(data || `The file "${file}" could not be found!`); })
        .catch(error => { console.error(error.toString()); });
    console.log("Reading file...");
}

// readFilePromise();

const readFilePromiseAsync = async (file = "data.txt") => {
    try {
        let data = await FSP.readFile(file, "utf8");
        await FSP.writeFile("data.txt", `${data} New data have been added.`, "utf8");
        data = await FSP.readFile(file, "utf8");
        return data || `The file "${file}" could not be found!`;
    }
    catch (error) { return error.toString(); }
}

console.log(await readFilePromiseAsync());
