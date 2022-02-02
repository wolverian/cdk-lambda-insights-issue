import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CdkLambdaInsightsIssueStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'CdkTsQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });
    const l = new lambda.Function(this, 'CdkTsLambda', {
      code: lambda.AssetCode.fromAsset('../lambda'),
      handler: 'bootstrap',
      runtime: lambda.Runtime.PROVIDED_AL2,
      insightsVersion: lambda.LambdaInsightsVersion.VERSION_1_0_119_0,
    });
  }
}
