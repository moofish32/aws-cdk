import { App, Resource, Stack } from '@aws-cdk/core';
import { Bucket, EventType, BucketNotificationTargetType } from '../lib';

const app = new App(process.argv);

const stack = new Stack(app, 'aws-cdk-s3-bucket-notifications');

const bucket = new Bucket(stack, 'TestBucket');

const topic = new Resource(stack, 'Topic', {
    type: 'AWS::SNS::Topic'
});

const bucketNotificationTarget = {
    type: BucketNotificationTargetType.Topic,
    arn: topic.ref
};

bucket.onEvent(EventType.ObjectCreated, { bucketNotificationTarget }, 'images/*', '*.jpg');

process.stdout.write(app.run());
