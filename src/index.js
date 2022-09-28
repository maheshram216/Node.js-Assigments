const fs = require('fs/promises')

const myFileWriter = async (fileName, fileContent) => {
	// write code here
	await fs.writeFile(fileName,fileContent);
};

const myFileReader = async (fileName) => {
	const filedata = await fs.readFile(fileName, 'utf-8');
	console.log(filedata);
}


const myFileUpdater = async (fileName, fileContent) => {	
	const filedata = await fs.appendFile(fileName , fileContent)
		console.log(filedata);
}

const myFileDeleter = async (fileName) => {
	let data =await fs.unlink(fileName)
}

myFileWriter('text.txt', 'Hello');
myFileReader('text.txt');
myFileUpdater('text.txt', ' World');
myFileDeleter('text.txt');


module.exports = { myFileWriter, myFileUpdater, myFileReader, myFileDeleter }