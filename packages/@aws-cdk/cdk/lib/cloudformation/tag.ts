import { Token } from '../core/tokens/token';
/**
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html
 */
export interface CfnTag {
  /**
   * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html#cfn-resource-tags-key
   */
  key: string | Token;

  /**
   * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html#cfn-resource-tags-value
   */
  value: string | Token;
}
