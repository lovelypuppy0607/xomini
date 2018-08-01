import { getTypes, typesAll } from './actions/types';
import { gameTypes } from './game/actions';

export const types = getTypes('user');

export default function(store = {}, action) {
   const { type, login, room } = action;

   if (type === types.add) {
      if (!store[login]) {
         return {
            ...store,
            [login]: {
               room
            }
         };
      } else {
         action.isExist = true;
      }
   } else if (type === types.remove) {
      const user = store[login];

      if (user) {
         action.room = user.room;
         action.isExist = true;
         delete store[login];
         return {
            ...store
         };
      }
   } else if (type === gameTypes.addStep && login && store[login]) {
      action.room = store[login].room;
   } else if (type === typesAll.fetch && action.users) {
      return {
         ...action.users
      };
   }

   return store;
};

/**
 * @param {Object} params
 * @param {String} params.login
 * @param {String} params.room
 */
export function addUser(login = generateLogin(), room = null) {
   if (login === '') {
      login = generateLogin();
   }

   return {
      type: types.add,
      login,
      room
   };
};

export function removeUser(login) {
   return {
      type: types.remove,
      login
   };
};

function generateLogin() {
   return 'Player ' + new Date().getTime();
};
