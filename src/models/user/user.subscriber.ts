import { User } from 'src/models/user/entity/user.entity';
import {
   DataSource,
   EntitySubscriberInterface,
   EventSubscriber,
   InsertEvent,
   TransactionCommitEvent,
   UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
   constructor(dataSource: DataSource) {
      dataSource.subscribers.push(this);
   }

   listenTo() {
      return User;
   }

   /**
    * Called before entity update.
    */
   async afterUpdate(event: UpdateEvent<User>) {
      const { entity, manager } = event;
      if (entity) {
         await manager.getRepository(User).save({ ...entity, updatedAt: new Date().getTime() });
      }
   }
}
