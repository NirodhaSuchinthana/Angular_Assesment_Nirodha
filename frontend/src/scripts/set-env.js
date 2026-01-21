const fs = require('fs');
const writeFile = fs.writeFile;
const targetPath = './src/environments/environment.ts';
const targetPathProd = './src/environments/environment.prod.ts';

// Load dotenv to read .env file
require('dotenv').config();

// `environment.ts` file structure
const envConfigFile = `export const environment = {
  production: false,
  baseUrl: '${process.env.BASE_URL || "/api"}'
};
`;

const envConfigFileProd = `export const environment = {
  production: true,
  baseUrl: '${process.env.BASE_URL || "/api"}'
};
`;

console.log('The file `environment.ts` will be written with the following content: \n');
console.log(envConfigFile);

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
  }
});

writeFile(targetPathProd, envConfigFileProd, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment.prod.ts file generated correctly at ${targetPathProd} \n`);
  }
});
