import { NestedStack } from "aws-cdk-lib";
import { CfnKeyPair, IInstance, Instance, InstanceClass, InstanceSize, InstanceType, ISecurityGroup, IVpc, MachineImage } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import BaseNestedStackProps from "../types/BaseNestedStackProps";

interface Ec2StackProps extends BaseNestedStackProps {
  vpc: IVpc;
  bastionHostSecurityGroup: ISecurityGroup;
}

export class Ec2Stack extends NestedStack {
  private readonly bastionHost: IInstance;
  private readonly keypair: CfnKeyPair;

  public getBastionHost() {
    return this.bastionHost;
  }

  public getKeypair() {
    return this.keypair;
  }
  
  constructor(scope: Construct, id: string, props: Ec2StackProps) {
    super(scope, id, props);

    const { envName, appName } = props;

    this.keypair = new CfnKeyPair(this, "keypair", {
      keyName: `${envName}-${appName}-keypair`,
      keyType: "rsa"
    });

    const subnet = props.vpc.selectSubnets({
      subnetGroupName: `${envName}-${appName}-public-nat-gw-subnets`
    }).subnets[0];

    this.bastionHost = new Instance(this, "bastion-host", {
      instanceName: `${envName}-${appName}-bastion-host`,
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
      machineImage: MachineImage.latestAmazonLinux(),
      vpc: props.vpc,
      vpcSubnets: {
        subnets: [subnet]
      },
      availabilityZone: subnet.availabilityZone,
      securityGroup: props.bastionHostSecurityGroup,
      allowAllOutbound: true,
      keyName: this.keypair.keyName
    });
  }
}