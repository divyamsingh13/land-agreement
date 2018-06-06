import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.mynetwork{
   export class Land extends Asset {
      addressLand: string;
      information: string;
      owner: Person;
      isAvailable: boolean;
   }
   export class Person extends Participant {
      personId: string;
      firstName: string;
      lastName: string;
   }
   export class User extends Participant {
      userId: string;
      firstName: string;
      lastName: string;
      email: string;
   }
   export class Trade extends Transaction {
      land: Land;
      newOwner: Person;
      oldOwner: Person;
      user: User;
   }
   export class Sold extends Event {
      asset: Land;
      user: User;
      oldOwner: string;
      newOwner: string;
   }
// }
