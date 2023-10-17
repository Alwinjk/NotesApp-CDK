import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { IAMStack } from "./iam-stack";
import { taggingVars } from "./tags";

export class FunctionStack extends cdk.Stack {
    public readonly notesLambda: lambda.Function;
    
    constructor(scope: Construct, id: string, props?:cdk.StackProps) {
        super(scope, id, props);

        const iamStack = new IAMStack(this, 'NotesApp-CDK-IAMStack', {
            stackName: `${taggingVars.ServiceName}-IAMStack`
        });
        const lambdaRole = iamStack.lambdaRole;

        const environmentVariables = {
            NOTES_TABLE_NAME: "NotesApp-CDK-NotesTable"
        }

        this.notesLambda = new lambda.Function(this, 'NotesLambda', {
            functionName: "NotesApp-CDK-Processor",
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: "index.handler",
            code: lambda.Code.fromAsset('service'),
            role: lambdaRole,
            environment: environmentVariables
        })
    }
}