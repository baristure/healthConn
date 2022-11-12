import { NestedStack } from "aws-cdk-lib";
import { CfnKeyPair, IInstance, Instance, InstanceClass, InstanceSize, InstanceType, ISecurityGroup, IVpc, MachineImage } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { BaseNestedStackProps } from "../dto/BaseNestedStackProps";

interface Ec2StackProps extends BaseNestedStackProps {
  vpc: IVpc;
  bastionHostSecurityGroup: ISecurityGroup;
}

export class Ec2Stack extends NestedStack {

  private readonly _bastionHost: IInstance;
  private readonly _keypair: CfnKeyPair;
  
  public get bastionHost(): IInstance {
    return this._bastionHost;
  }

  public get keypair(): CfnKeyPair {
    return this._keypair;
  }

  constructor(scope: Construct, id: string, props: Ec2StackProps) {
    super(scope, id, props);

    const {
      app,
      env,
      vpc,
      bastionHostSecurityGroup
    } = props;

    this._keypair = new CfnKeyPair(
      this,
      "keypair",
      {
        keyName: `${app}-${env}-keypair`,
        keyType: "rsa"
      }
    );

    const subnet = vpc.selectSubnets({
      subnetGroupName: `${app}-${env}-public-subnets`
    }).subnets[0];

    this._bastionHost = new Instance(
      this,
      "bastion-host",
      {
        instanceName: `${app}-${env}-bastion-host`,
        instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
        machineImage: MachineImage.latestAmazonLinux(),
        vpc,
        vpcSubnets: {
          subnets: [
            subnet
          ]
        },
        availabilityZone: subnet.availabilityZone,
        securityGroup: bastionHostSecurityGroup,
        allowAllOutbound: true,
        keyName: this._keypair.keyName
      }
    );
  }
}