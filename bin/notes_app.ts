#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FunctionStack } from '../lib/function-stack';
import { ApiGatewayStack } from '../lib/api-stack';
import { IAMStack } from '../lib/iam-stack';
import { DynamoDBStack } from "../lib/db-stack";
import { taggingVars } from '../lib/tags';


const app = new cdk.App();
// Create stacks
// new IAMStack(app, "NotesApp-CDK-IAMStack", {
//     stackName: `${taggingVars.ServiceName}-IAMStack`
// });
// new FunctionStack(app, 'NotesApp-CDK-LambdaStack', {
//     stackName: `${taggingVars.ServiceName}-FunctionStack`
// });
new ApiGatewayStack(app, 'NotesApp-CDK-ApiGatewayStack',{
    stackName: `${taggingVars.ServiceName}-ApiGatewayStack`
});
new DynamoDBStack(app, "NotesApp-CDK-DynamoDBStack", {
    stackName: `${taggingVars.ServiceName}-DynamoDBStack`
})




