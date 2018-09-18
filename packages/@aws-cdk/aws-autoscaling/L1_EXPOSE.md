# Why expose L1s? 

Launch Configuration is completely hidden and this makes the construct hard to
use today:
 1. cfn_signal needs access to logicalID which we don't have
 1. old vpcs might have incorrectly configured MapPublicIpOnLaunch and now you
    can't fix it by setting `associatePublicIpAddress`
 1. If you diff the settings available in Launch Config and our L2 there are
    many features not exposed (tenancy, block device mappings, etc)

If you notice I did not expose any resources where we have L2s because in
general I felt those were complete, but I could convinced otherwise

The examples here extend to many resources:
 * RDS -> can't properly get to Parameter Group Name for ClusterDBs
 * VPC -> hard to use vpc endpoints today because route tables are hidden
 * EKS -> Limited today because of public/private exclusive configuration and
   teams may want this `associatePublicIpAddress` as a temporary protection

I expect there are many more examples like this today, just because we can't get
to the L2 constructs fast enough and with the quality they need.
