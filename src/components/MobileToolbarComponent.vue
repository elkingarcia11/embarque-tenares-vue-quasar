<template>
  <!-- Button to toggle the drawer -->
  <q-btn
    :ripple="false"
    flat
    @click="drawer = !drawer"
    round
    dense
    icon="menu"
  />

  <!-- Button to navigate to the 'main' route -->
  <q-btn flat @click="navigateToRoute('/')">
    <div
      style="
        font-family: 'BodoniSvtyTwoSCITCTT-Book';
        font-size: large;
        font-weight: bold;
      "
    >
      Embarque Tenares
    </div>
  </q-btn>

  <!-- Navigation Drawer -->
  <q-drawer
    v-model="drawer"
    :width="300"
    :breakpoint="500"
    overlay
    overflow-auto
    bordered
    class="bg-white menuDrawer"
    style="font-family: 'BodoniSvtyTwoSCITCTT-Book'"
  >
    <q-list>
      <!-- Loop through menu items -->
      <template v-for="(menuItem, index) in menuList" :key="index">
        <!-- Regular menu item -->
        <q-item
          class="text-h4 q-py-md q-px-l"
          v-if="menuItem.label !== 'branch'"
          clickable
          @click="navigateToRoute(menuItem.route)"
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar
              :icon="menuItem.icon"
              color="primary"
              size="lg"
              text-color="white"
            />
          </q-item-section>
          <q-item-section class="text-black">
            {{ $t(menuItem.label) }}
          </q-item-section>
        </q-item>

        <!-- Menu item with sub-items -->
        <q-expansion-item
          v-else
          clickable
          :label="$t(menuItem.label)"
          default-closed
          header-class="q-py-md text-h4"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar
                :icon="menuItem.icon"
                color="primary"
                size="lg"
                text-color="white"
              />
            </q-item-section>

            <q-item-section class="text-black">
              {{ $t(menuItem.label) }}
            </q-item-section>
          </template>

          <!-- Loop through sub-menu items -->
          <q-item
            class="text-h4 q-py-md q-pl-xl row"
            v-for="(subMenuItem, index) in subMenuList"
            :key="index"
            clickable
            @click="navigateToRoute(subMenuItem.route)"
            v-ripple
          >
            <q-avatar
              :icon="subMenuItem.icon"
              color="primary"
              size="lg"
              text-color="white"
            />
            <q-item-section class="q-pl-md text-black">
              {{ $t(subMenuItem.label) }}
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Separator between menu items -->
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
    // Initialize Vue Router
    const $router = useRouter();

    // Reactive state for the drawer's open/closed state
    const drawer = ref(false);

    // Sub-menu items
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

    // Main menu items
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
      {
        icon: 'policy',
        label: 'policy',
        route: 'shipping-policy',
        separator: false,
      },
    ];

    const navigateToRoute = (route: string | undefined) => {
      if (typeof route === 'string') {
        $router.push(route);
      }
    };

    // Expose data and methods to the template
    return {
      drawer,
      menuList,
      subMenuList,
      navigateToRoute,
    };
  },
};
</script>
