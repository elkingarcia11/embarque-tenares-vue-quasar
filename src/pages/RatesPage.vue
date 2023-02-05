<template>
  <q-list>
    <q-expansion-item expanded-icon="arrow_drop_down" expand-icon="arrow_right">
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar size="70px">
            <img src="../assets/box.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section class="text-h5"> Category </q-item-section>
      </template>
      <div class="rates_row">
        <q-item-section class="text-subtitle1 q-pl-lg q-py-sm">
          Item description description description description description
          description description description description description
        </q-item-section>
        <q-item-section avatar>
          <q-avatar size="70px" font-size="20px" text-color="white">
            $450+
          </q-avatar>
        </q-item-section>
      </div>
    </q-expansion-item>
    <q-separator horizontal />
    <q-expansion-item expanded-icon="arrow_drop_down" expand-icon="arrow_right">
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar size="70px">
            <img src="../assets/drum.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section class="text-h6"> Category </q-item-section>
      </template>

      <q-item class="rates_row">
        <q-item-section class="text-subtitle1 q-pl-lg q-py-sm"
          >Item description description description description description
          description description description description
          description</q-item-section
        >
        <q-item-section avatar>
          <q-avatar size="70px" font-size="20px" text-color="white">
            $450+
          </q-avatar>
        </q-item-section>
      </q-item>
    </q-expansion-item>
    <q-separator horizontal />
    <q-expansion-item expanded-icon="arrow_drop_down" expand-icon="arrow_right">
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar size="70px">
            <img src="../assets/appliance.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section class="text-h6"> Category </q-item-section>
      </template>

      <q-item class="rates_row">
        <q-item-section class="text-subtitle1 q-pl-lg q-py-sm"
          >Item description description description description description
          description description description description
          description</q-item-section
        >
        <q-item-section avatar>
          <q-avatar size="70px" font-size="20px" text-color="white">
            $450+
          </q-avatar>
        </q-item-section>
      </q-item>
    </q-expansion-item>
    <q-separator horizontal />
    <q-expansion-item expanded-icon="arrow_drop_down" expand-icon="arrow_right">
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar size="70px">
            <img src="../assets/furniture.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section class="text-h6"> Category </q-item-section>
      </template>

      <q-item class="rates_row">
        <q-item-section class="text-subtitle1 q-pl-lg q-py-sm"
          >Item description description description description description
          description description description description
          description</q-item-section
        >
        <q-item-section avatar>
          <q-avatar size="70px" font-size="20px" text-color="white">
            $450+
          </q-avatar>
        </q-item-section>
      </q-item>
    </q-expansion-item>
    <q-separator horizontal />
  </q-list>
</template>

<script lang="ts">
import '../css/rates.scss';

export default {};
</script>
