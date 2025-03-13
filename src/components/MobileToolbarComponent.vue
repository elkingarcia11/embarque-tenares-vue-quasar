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
    class="bg-white menuDrawer menu-drawer"
  >
    <!-- Drawer Header -->
    <div class="drawer-header q-py-md q-px-md text-center">
      <div class="text-h6 text-weight-bold">{{ t('menu') }}</div>
    </div>
    
    <q-list>
      <!-- Loop through menu items -->
      <template v-for="(menuItem, index) in menuList" :key="index">
        <!-- Regular menu item -->
        <q-item
          class="menu-item q-py-md q-px-l"
          v-if="menuItem.label !== 'branch'"
          clickable
          @click="navigateToRoute(menuItem.route)"
          v-ripple
        >
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" color="primary" size="md" />
          </q-item-section>
          <q-item-section class="text-black menu-item-text">
            {{ t(menuItem.label) }}
          </q-item-section>
        </q-item>

        <!-- Menu item with sub-items -->
        <q-expansion-item
          v-else
          clickable
          :label="t(menuItem.label)"
          default-closed
          header-class="q-py-md menu-item"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" color="primary" size="md" />
            </q-item-section>

            <q-item-section class="text-black menu-item-text">
              {{ t(menuItem.label) }}
            </q-item-section>
          </template>

          <!-- Loop through sub-menu items -->
          <q-item
            class="submenu-item q-py-md q-pl-xl row"
            v-for="(subMenuItem, index) in subMenuList"
            :key="index"
            clickable
            @click="navigateToRoute(subMenuItem.route)"
            v-ripple
          >
            <q-icon :name="subMenuItem.icon" color="primary" size="md" class="q-ml-md" />
            <q-item-section class="q-pl-md text-black menu-item-text">
              {{ t(subMenuItem.label) }}
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
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const router = useRouter();
    const { t } = useI18n();
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
        icon: 'local_shipping',
        label: 'services',
        route: 'shipping-services',
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
        router.push(route);
      }
    };

    // Expose data and methods to the template
    return {
      drawer,
      menuList,
      subMenuList,
      navigateToRoute,
      t
    };
  },
};
</script>

<style lang="scss" scoped>
.menu-drawer {
  .menu-item, .q-expansion-item__content {
    font-size: 18px;
  }
  
  .submenu-item {
    font-size: 16px;
  }
  
  .q-item__section--avatar {
    min-width: 48px;
  }
}

.drawer-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.menu-item-text {
  font-size: 16px !important;
  font-weight: 500 !important;
}

/* Force consistent font size for all menu items */
.q-item__label, .q-expansion-item__content {
  font-size: 16px !important;
  font-weight: 500 !important;
}

/* Add more padding to menu items for better touch targets */
.q-item {
  padding-top: 12px !important;
  padding-bottom: 12px !important;
}

/* Remove the pseudo-element header */
.menu-drawer::before {
  content: none;
}
</style>
