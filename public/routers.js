import Vocaloid from './views/Vocaloid.vue';
import Singer from './views/Singer.vue';

export default function(router) {

  router.map({
    '/': {
      component: Vocaloid
    },
    '/singer': {
      component: Singer
    }
  });

};
