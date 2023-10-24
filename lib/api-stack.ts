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

    // Create a resource (e.g., /items)
    const notesResource = api.root.addResource('list-all-notes');
    // Create a GET method and integrate with the Lambda function
    const listAllNotesMethod = notesResource.addMethod('GET', new apigateway.LambdaIntegration(notesLambda));
    // Configure method response
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
    })
    
  }
}
