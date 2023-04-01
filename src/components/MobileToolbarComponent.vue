<template>
  <q-btn
    :ripple="false"
    flat
    @click="drawer = !drawer"
    round
    dense
    icon="menu"
    class="q-ml-xs"
  />
  <q-btn
    flat
    class="q-pl-none"
    @click="
      $router.push({
        name: 'main',
      })
    "
  >
    <div
      class="q-pl-md"
      style="
        font-family: 'BodoniSvtyTwoSCITCTT-Book';
        font-size: large;
        font-weight: bold;
      "
    >
      Embarque Tenares
    </div>
  </q-btn>
  <q-drawer
    v-model="drawer"
    :width="300"
    :breakpoint="500"
    overlay
    bordered
    class="bg-white menuDrawer"
    style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
  >
    <q-list>
      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item
          class="text-h5 q-py-md q-px-l"
          v-if="index < 4"
          clickable
          @click="navigateToRoute(menuItem.route)"
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar
              :icon="menuItem.icon"
              color="primary"
              text-color="white"
            />
          </q-item-section>
          <q-item-section class="text-black">
            {{ $t(menuItem.label) }}
          </q-item-section>
        </q-item>
        <q-expansion-item
          v-if="index > 3"
          clickable
          :label="$t(menuItem.label)"
          default-closed
          header-class="q-py-md text-h5"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar
                :icon="menuItem.icon"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section class="text-black">
              {{ $t(menuItem.label) }}
            </q-item-section>
          </template>
          <q-item
            class="text-h5 q-py-md q-pl-xl row"
            v-for="(subMenuItem, index) in subMenuList"
            :key="index"
            clickable
            @click="$router.push(subMenuItem.route)"
            v-ripple
          >
            <q-avatar
              :icon="subMenuItem.icon"
              color="primary"
              text-color="white"
            />
            <q-item-section class="q-pl-md text-black">
              {{ $t(subMenuItem.label) }}
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-separator :key="'sep' + index" v-if="menuItem.separator" />
      </template>
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const $router = useRouter();

    const drawer = ref(false);

    const subMenuList = [
      {
        icon: 'pin_drop',
        label: 'nyb',
        route: 'ny-branch',
        separator: false,
      },
      {
        icon: 'pin_drop',
        label: 'drb',
        route: 'dr-branch',
        separator: false,
      },
    ];

    const menuList = [
      {
        icon: 'home',
        label: 'home',
        route: '/',
        separator: false,
      },
      {
        icon: 'search',
        label: 'track',
        route: 'track',
        separator: false,
      },
      {
        icon: 'local_atm',
        label: 'rates',
        route: 'rates',
        separator: false,
      },
      {
        icon: 'quiz',
        label: 'faqs',
        route: 'faqs',
        separator: false,
      },
      {
        icon: 'map',
        label: 'branch',
        separator: false,
      },
    ];

    const navigateToRoute = (route: string | undefined) => {
      if (typeof route === 'string') {
        $router.push(route);
      }
    };

    return {
      drawer,
      menuList,
      subMenuList,
      navigateToRoute,
    };
  },
};
</script>
