import ts = require("typescript");

type SourceFileTransformerFactory = ts.TransformerFactory<ts.SourceFile>

export const removeExportTransformerFactory:SourceFileTransformerFactory=(context: ts.TransformationContext)=>{
    return (node:ts.SourceFile)=>{
        
        const visitor:ts.Visitor=(node:ts.Node)=>{
            if(ts.isFunctionDeclaration(node)){
                return ts.visitEachChild(node,visitor,context);
            }
            if(ts.isModifier(node)){
                return undefined;
            }
            return node;
        };

        return ts.visitEachChild(node,visitor,context);
    }
}

export const remove__esModuleFactory:SourceFileTransformerFactory=(context: ts.TransformationContext)=>{
        
    const previousOnSubstituteNode=context.onSubstituteNode;
    context.enableSubstitution(ts.SyntaxKind.ExpressionStatement);
    context.onSubstituteNode=((hint,node)=>{
        node=previousOnSubstituteNode(hint,node);
        
        if(ts.isExpressionStatement(node)&&ts.isBinaryExpression(node.expression)&&ts.isPropertyAccessExpression(node.expression.left)){
            let pe:ts.PropertyAccessExpression=node.expression.left;
            if(pe.name.text==="__esModule"){
                return ts.createEmptyStatement();
            }
        }
        return node;
    });
    return node=>node;
        
}

function getCustomTransformersInternal(){
    const customTransformers:ts.CustomTransformers={
        before:[removeExportTransformerFactory],
        after:[remove__esModuleFactory]
    }
    return customTransformers;
}
export const getCustomTransformers=getCustomTransformersInternal as any;