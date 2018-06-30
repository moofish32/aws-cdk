import { Arn } from "@aws-cdk/core";
import { s3 } from '@aws-cdk/resources';

export enum EventType {
    /**
     * Amazon S3 APIs such as PUT, POST, and COPY can create an object. Using
     * these event types, you can enable notification when an object is created
     * using a specific API, or you can use the s3:ObjectCreated:* event type to
     * request notification regardless of the API that was used to create an
     * object.
     */
    ObjectCreated = 's3:ObjectCreated:*',

    /**
     * Amazon S3 APIs such as PUT, POST, and COPY can create an object. Using
     * these event types, you can enable notification when an object is created
     * using a specific API, or you can use the s3:ObjectCreated:* event type to
     * request notification regardless of the API that was used to create an
     * object.
     */
    ObjectCreatedPut = 's3:ObjectCreated:Put',

    /**
     * Amazon S3 APIs such as PUT, POST, and COPY can create an object. Using
     * these event types, you can enable notification when an object is created
     * using a specific API, or you can use the s3:ObjectCreated:* event type to
     * request notification regardless of the API that was used to create an
     * object.
     */
    ObjectCreatedPost = 's3:ObjectCreated:Post',

    /**
     * Amazon S3 APIs such as PUT, POST, and COPY can create an object. Using
     * these event types, you can enable notification when an object is created
     * using a specific API, or you can use the s3:ObjectCreated:* event type to
     * request notification regardless of the API that was used to create an
     * object.
     */
    ObjectCreatedCopy = 's3:ObjectCreated:Copy',

    /**
     * Amazon S3 APIs such as PUT, POST, and COPY can create an object. Using
     * these event types, you can enable notification when an object is created
     * using a specific API, or you can use the s3:ObjectCreated:* event type to
     * request notification regardless of the API that was used to create an
     * object.
     */
    ObjectCreatedCompleteMultipartUpload = 's3:ObjectCreated:CompleteMultipartUpload',

    /**
     * By using the ObjectRemoved event types, you can enable notification when
     * an object or a batch of objects is removed from a bucket.
     *
     * You can request notification when an object is deleted or a versioned
     * object is permanently deleted by using the s3:ObjectRemoved:Delete event
     * type. Or you can request notification when a delete marker is created for
     * a versioned object by using s3:ObjectRemoved:DeleteMarkerCreated. For
     * information about deleting versioned objects, see Deleting Object
     * Versions. You can also use a wildcard s3:ObjectRemoved:* to request
     * notification anytime an object is deleted.
     *
     * You will not receive event notifications from automatic deletes from
     * lifecycle policies or from failed operations.
     */
    ObjectRemoved = 's3:ObjectRemoved:*',

    /**
     * By using the ObjectRemoved event types, you can enable notification when
     * an object or a batch of objects is removed from a bucket.
     *
     * You can request notification when an object is deleted or a versioned
     * object is permanently deleted by using the s3:ObjectRemoved:Delete event
     * type. Or you can request notification when a delete marker is created for
     * a versioned object by using s3:ObjectRemoved:DeleteMarkerCreated. For
     * information about deleting versioned objects, see Deleting Object
     * Versions. You can also use a wildcard s3:ObjectRemoved:* to request
     * notification anytime an object is deleted.
     *
     * You will not receive event notifications from automatic deletes from
     * lifecycle policies or from failed operations.
     */
    ObjectRemovedDelete = 's3:ObjectRemoved:Delete',

    /**
     * By using the ObjectRemoved event types, you can enable notification when
     * an object or a batch of objects is removed from a bucket.
     *
     * You can request notification when an object is deleted or a versioned
     * object is permanently deleted by using the s3:ObjectRemoved:Delete event
     * type. Or you can request notification when a delete marker is created for
     * a versioned object by using s3:ObjectRemoved:DeleteMarkerCreated. For
     * information about deleting versioned objects, see Deleting Object
     * Versions. You can also use a wildcard s3:ObjectRemoved:* to request
     * notification anytime an object is deleted.
     *
     * You will not receive event notifications from automatic deletes from
     * lifecycle policies or from failed operations.
     */
    ObjectRemovedDeleteMarkerCreated = 's3:ObjectRemoved:DeleteMarkerCreated',

    /**
     * You can use this event type to request Amazon S3 to send a notification
     * message when Amazon S3 detects that an object of the RRS storage class is
     * lost.
     */
    ReducedRedundancyLostObject = 's3:ReducedRedundancyLostObject',
}

export interface BucketNotificationProps {
    /**
     * The S3 bucket event.
     */
    event: EventType;

    /**
     * The filtering rule that determine which objects trigger the event. For
     * example, you can create a filter so that only image files with a .jpg
     * extension trigger the event when they are added to the S3 bucket.
     *
     * @default All objects will trigger the event
     */
    s3KeyFilter?: string;

    /**
     * The target of the notification.
     */
    target: IBucketNotificationTarget;
}

export interface IBucketNotificationTarget {
    bucketNotificationTarget(bucketArn: s3.BucketArn): BucketNotificationTarget;
}

export interface BucketNotificationTarget {
    readonly type: BucketNotificationTargetType;
    readonly arn: Arn;
}

export enum BucketNotificationTargetType {
    Lambda,
    Queue,
    Topic
}
