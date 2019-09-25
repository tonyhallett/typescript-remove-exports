#typescript-remove-exports

##Why

Useful if you have a typescript file that you want to test that is not a module.

##How

Add export keyword to the functions that you want to test.
e.g fileWithExport.ts
```typescript
export function testThis(){}
```

Transform the typescript with the exports to remove them.
1) npm install --save-dev typescript-remove-exports

2 option 1) Use with gulp-typescript.
```typescript
import * as ts from 'gulp-typescript'
import { getCustomTransformers } from 'typescript-remove-exports'

export function gulpCompileWithTransform(){
    const yourTsConfigPath = 'path to your tsconfig...';
    const yourDest='your destination...';

    const project=ts.createProject(yourTsConfigPath,{
        getCustomTransformers:getCustomTransformers
    });
    
    return project.src().pipe(project()).pipe(dest(yourDest));
    
}
```
or
2 option 2) Use typescript api
```typescript
import * as ts from "typescript"
import { removeExportTransformerFactory, remove__esModuleFactory } from 'typescript-remove-exports'

const yourCompilerOptions:ts.CompilerOptions={
    module:ts.ModuleKind.None,
    target:ts.ScriptTarget.ES3,
    strict:true,
    removeComments:true
}
function getSourceText(){
    //get the typescript as a string
}
function transpileRemoving__esModule(){
    
    const output= ts.transpileModule(getSourceText(),{
        compilerOptions:yourCompilerOptions,
        transformers:{
            before:[
                removeExportTransformerFactory,
            ],
            after:[remove__esModuleFactory]
        }
    }).outputText;
    
    //do something with it
    return output;
}
```


