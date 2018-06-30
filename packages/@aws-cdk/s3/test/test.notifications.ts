import { expect } from '@aws-cdk/assert';
import { Stack } from '@aws-cdk/core';
import { Arn } from '@aws-cdk/core';
import { Test } from 'nodeunit';
import { Bucket, BucketNotificationTargetType, EventType, IBucketNotificationTarget } from '../lib';

export = {
    'subscription types'(test: Test) {
        const stack = new Stack();

        const bucket = new Bucket(stack, 'TestBucket');

        const queueTarget: IBucketNotificationTarget = {
            bucketNotificationTarget: {
                type: BucketNotificationTargetType.Queue,
                arn: new Arn('arn:aws:sqs:...')
            }
        };

        const lambdaTarget: IBucketNotificationTarget = {
            bucketNotificationTarget: {
                type: BucketNotificationTargetType.Lambda,
                arn: new Arn('arn:aws:lambda:...')
            }
        };

        const topicTarget: IBucketNotificationTarget = {
            bucketNotificationTarget: {
                type: BucketNotificationTargetType.Topic,
                arn: new Arn('arn:aws:sns:...')
            }
        };

        bucket.onEvent(EventType.ObjectCreated, queueTarget);
        bucket.onEvent(EventType.ObjectCreated, topicTarget);
        bucket.onEvent(EventType.ObjectCreated, lambdaTarget);

        expect(stack).toMatch({
          Resources: {
            TestBucket560B80BC: {
              Type: "AWS::S3::Bucket",
              Properties: {
                NotificationConfiguration: {
                  LambdaConfigurations: [
                    {
                      Event: "s3:ObjectCreated:*",
                      Function: "arn:aws:lambda:..."
                    }
                  ],
                  QueueConfigurations: [
                    {
                      Event: "s3:ObjectCreated:*",
                      Queue: "arn:aws:sqs:..."
                    }
                  ],
                  TopicConfigurations: [
                    {
                      Event: "s3:ObjectCreated:*",
                      Topic: "arn:aws:sns:..."
                    }
                  ]
                }
              }
            }
          }
        });

        test.done();
    },

    'multiple subscriptions of the same type'(test: Test) {
        const stack = new Stack();

        const bucket = new Bucket(stack, 'TestBucket');

        bucket.onEvent(EventType.ObjectRemovedDelete, {
            bucketNotificationTarget: {
                type: BucketNotificationTargetType.Queue,
                arn: new Arn('arn:aws:sqs:...:queue1')
            }
        });

        bucket.onEvent(EventType.ObjectRemovedDelete, {
            bucketNotificationTarget: {
                type: BucketNotificationTargetType.Queue,
                arn: new Arn('arn:aws:sqs:...:queue2')
            }
        });

        expect(stack).toMatch({
          Resources: {
            TestBucket560B80BC: {
              Type: "AWS::S3::Bucket",
              Properties: {
                NotificationConfiguration: {
                  QueueConfigurations: [
                    {
                      Event: "s3:ObjectRemoved:Delete",
                      Queue: "arn:aws:sqs:...:queue1"
                    },
                    {
                      Event: "s3:ObjectRemoved:Delete",
                      Queue: "arn:aws:sqs:...:queue2"
                    }
                  ]
                }
              }
            }
          }
        });
        test.done();
    },

    'prefix/suffix filters'(test: Test) {
        const stack = new Stack();

        const bucket = new Bucket(stack, 'TestBucket');

        const bucketNotificationTarget = {
            type: BucketNotificationTargetType.Queue,
            arn: new Arn('arn:aws:sqs:...')
        };

        bucket.onEvent(EventType.ObjectRemovedDelete, { bucketNotificationTarget }, 'images/*', '*.jpg');

        expect(stack).toMatch({
          Resources: {
            TestBucket560B80BC: {
              Type: "AWS::S3::Bucket",
              Properties: {
                NotificationConfiguration: {
                  QueueConfigurations: [
                    {
                      Event: "s3:ObjectRemoved:Delete",
                      Filter: {
                        S3Key: {
                          Rules: [
                            {
                              Name: "prefix",
                              Value: "images/"
                            },
                            {
                              Name: "suffix",
                              Value: ".jpg"
                            }
                          ]
                        }
                      },
                      Queue: "arn:aws:sqs:..."
                    }
                  ]
                }
              }
            }
          }
        });

        test.done();
    },
};
