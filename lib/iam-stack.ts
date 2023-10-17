import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam"
import { taggingVars } from "./tags";

export class IAMStack extends cdk.Stack {
    public readonly lambdaRole: iam.Role;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.lambdaRole = new iam.Role(this, 'LambdaRole', {
            roleName: `${taggingVars.ServiceName}-LambdaRole`,
            assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com")
        });

        this.lambdaRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_FullAccess'));
        this.lambdaRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'));
    }
}