<template>
  <v-container class="fill-height hero">
    <v-row class="fill-height" >
      <v-col
      :cols="2">
        <v-container   class="fill-height">
          <v-row dense >
          <Auth></Auth>
          </v-row>
          <v-row dense>
            <v-card
              class="mx-auto w-100"
              hover
            >
              <v-card-item>
                <v-card-title>
اخبار                </v-card-title>
                <v-card-subtitle>
آخرین اخبار سامانه                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                <v-list lines="two">
                  <v-list-item
                    v-for="n in 3"
                    :key="n"
                    :title="'خبر ' + n"
                    subtitle="تست خبر"
                  ></v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-row>
          <v-row dense>
            <v-card
              class="mx-auto w-100"
              hover
            >
              <v-card-item>
                <v-card-title>
آرزو های من
                </v-card-title>

              </v-card-item>

              <v-card-text>
                <v-list lines="two">
                  <v-list-item
                    v-for="n in 3"
                    :key="n"
                    :title="'آرزو ' + n"
                    subtitle="تست آرزو"
                    prepend-avatar="https://randomuser.me/api/portraits/women/8.jpg"
                  ></v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-row>
        </v-container>
      </v-col>
      <v-col
        :cols="8" >
        <v-container >
          <v-row class="justify-center align-content-center"  >
            <v-col class="text-center ">
              <v-card
                class="mx-auto"
                max-width="fit-content"
                hover
              >
                <v-card-item>
                  <v-card-title>
                    زمان باقی مانده تا دورهمی
                  </v-card-title>
                </v-card-item>
                <v-card-text>
                  <TurnClock :units="['روز', 'ساعت', 'دقیقه', 'ثانیه']" :endTime="new Date('2024-06-20 12:00:00')" bgColor="rgba(var(--v-theme-surface),0.5)"  color="" />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
              </v-col>
      <v-col
        :cols="2">
        <v-container  class="fill-height">
          <v-row dense>
            <v-card
              class="mx-auto w-100"
              hover
            >
              <v-card-item>
                <v-card-title>
افراد آنلاین                </v-card-title>
                <v-card-subtitle>
افراد آنلاین همین الان                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                <v-chip>
                  10
                </v-chip>
                نفر              </v-card-text>
            </v-card>
          </v-row>
          <v-row dense>
            <v-card
              class="mx-auto w-100"
              hover
            >
              <v-card-item>
                <v-card-title>
تعداد کل آرزو ها                </v-card-title>

              </v-card-item>

              <v-card-text>
                <v-chip>
                  100
                </v-chip>
                آرزو
              </v-card-text>
            </v-card>
          </v-row>
          <v-row>
            <v-card
              class="mx-auto"
              max-width="344"
              hover
            >
              <v-card-item>
                <v-card-title>
                  Card title
                </v-card-title>
                <v-card-subtitle>
                  Card subtitle secondary text
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </v-card-text>
            </v-card>
          </v-row>

        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<style  lang="scss">
.hero {
  background: url('../assets/wish-tree.png') no-repeat center center  !important;
  background-size: cover !important;
}
.test{
  max-width: fit-content !important;
}
.count-clock-time-unit{
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity)) !important;
}
</style>
<script  lang="ts">
import { defineComponent } from 'vue'
import TurnClock from 'vue-turn-clock';
import { useUserStore } from '../stores/user';
import {mapActions, mapState, mapStores} from "pinia";

export default defineComponent({
  name: 'HelloWorld',
  data :()=>({
}),
  computed:{
    ...mapStores(useUserStore),
    ...mapState(useUserStore,['user'])
  },
  components:{
    TurnClock
  },
  mounted() {
    // this.checkValidity();
  },
  methods:{
    ...mapActions(useUserStore,['checkValidity'])
  }
})
</script>
