import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { taggingVars } from './tags';
import { FunctionStack } from './function-stack'; // Import the LambdaStack
// import * as swaggerDefinition from './swagger.json';

export class ApiGatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Import the Lambda function from the LambdaStack
    const functionStack = new FunctionStack(this, 'NotesApp-CDK-LambdaStack', {
      stackName: `${taggingVars.ServiceName}-FunctionStack`
  });
    const notesLambda = functionStack.notesLambda;

    // Create an API Gateway
    const api = new apigateway.RestApi(this, 'NotesAppApiGw', {
      restApiName: 'NotesApp-CDK-API',
    });

    /* METHOD to list all notes */
    const notesResource = api.root.addResource('list-all-notes');
    const listAllNotesMethod = notesResource.addMethod('GET', new apigateway.LambdaIntegration(notesLambda));
    listAllNotesMethod.addMethodResponse({
      statusCode: '200',
      responseModels: {
        'application/json': new apigateway.Model(this, 'listAllNotesModel', {
          restApi: api,
          contentType: 'application/json',
          modelName: 'listAllNotesModel',
          schema: { type: apigateway.JsonSchemaType.OBJECT },
        }),
      },
    });

    /* METHOD to list a note */
    const getResource = api.root.addResource('get-a-note');
    const getNoteMethod= getResource.addMethod('POST', new apigateway.LambdaIntegration(notesLambda));
    getNoteMethod.addMethodResponse({
      statusCode: '200',
      responseModels: {
        'application/json': new apigateway.Model(this, 'getNoteModel', {
          restApi: api,
          contentType: 'application/json',
          modelName: 'getNoteModel',
          schema: { type: apigateway.JsonSchemaType.OBJECT },
        }),
      },
    });

    /* METHOD to create a note */
    const createResource = api.root.addResource('create-a-note');
    const createNoteMethod = createResource.addMethod('POST', new apigateway.LambdaIntegration(notesLambda));
    createNoteMethod.addMethodResponse({
      statusCode: '200',
      responseModels: {
        'application/json': new apigateway.Model(this, 'createNoteModel', {
          restApi: api,
          contentType: 'application/json',
          modelName: 'createNoteModel',
          schema: { type: apigateway.JsonSchemaType.OBJECT },
        }),
      },
    });

    /* METHOD to update a note */
    const updateResource = api.root.addResource('update-a-note');
    const updateNoteMethod = updateResource.addMethod('PUT', new apigateway.LambdaIntegration(notesLambda));
    updateNoteMethod.addMethodResponse({
      statusCode: '200',
      responseModels: {
        'application/json': new apigateway.Model(this, 'updateNoteModel', {
          restApi: api,
          contentType: 'application/json',
          modelName: 'updateNoteModel',
          schema: { type: apigateway.JsonSchemaType.OBJECT },
        }),
      },
    });

    /* METHOD to delete a note */
    const deleteResource = api.root.addResource('delete-a-note');
    const deleteNoteMethod = deleteResource.addMethod('DELETE', new apigateway.LambdaIntegration(notesLambda));
    deleteNoteMethod.addMethodResponse({
      statusCode: '200',
      responseModels: {
        'application/json': new apigateway.Model(this, 'deleteNoteModel', {
          restApi: api,
          contentType: 'application/json',
          modelName: 'deleteNoteModel',
          schema: { type: apigateway.JsonSchemaType.OBJECT },
        }),
      },
    });
    
  }
}
