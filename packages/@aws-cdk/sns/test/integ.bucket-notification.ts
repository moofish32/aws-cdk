import { App, Stack } from '@aws-cdk/core';
import { Bucket, EventType } from '@aws-cdk/s3';
import { Topic } from '../lib';

const app = new App(process.argv);

const stack = new Stack(app, 'aws-cdk-sns-bucket-notifications');

const bucket = new Bucket(stack, 'MyBucket');
const topic = new Topic(stack, 'MyTopic');

bucket.onEvent(EventType.ObjectCreated, topic, 'files/*');

process.stdout.write(app.run());
