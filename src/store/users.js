import { types as t, flow } from 'mobx-state-tree';
import ApiCall from '../api';

export const User = t.model('User', {
    id: t.identifier,
    createdAt: t.string,
    name: t.string,
    avatar: t.string
});

const ActiveUser = User.named('ActiveUser');

const UsersStore = t.model('UsersStore', {
    users: t.maybe(t.array(User)),
    me: t.maybe(ActiveUser),
}).actions(self => ({
        load: flow(function* (){
            self.users = yield ApiCall.get('users');
            self.me = yield ApiCall.get('me');
        }),
        afterCreate(){
            self.load();
        }
})).views(self => ({
    get list (){
        return self.users?.map(({ id, name }) => ({ id, name }))
    }
}))

export default UsersStore;