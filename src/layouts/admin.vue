<template>
  <div>
    <el-container class="relative min-h-screen bg-hd-Bg-1 text-hd-white-50">
      <!-- Menu -->
      <!-- <el-scrollbar class="z-[99]! !absolute md:!relative"> -->
      <Menu />
      <!-- </el-scrollbar> -->
      <el-container class="relative grid min-h-full">
        <!-- <div
          class="mask md:hidden"
          @click="closeMenu"
          :class="{ close: !menuStore.isMenuCollapse }"></div> -->
        <div class="content grid w-full grid-rows-[auto_1fr] bg-cover bg-no-repeat bg-transparent">
          <div class="relative w-full bg-transparent">
            <NavBar />
            <transition name="top-slide-fade" mode="out-in">
              <HistoryLink v-if="menuStore.isHistoryCollapse" />
            </transition>
          </div>

          <main
            class="relative mx-2 mb-2 overflow-y-auto rounded-lg bg-hd-bg main"
            :class="{
              'mt-3': !menuStore.isBreadcrumbCollapse && !menuStore.isHistoryCollapse,
              'mt-6': menuStore.isBreadcrumbCollapse && !menuStore.isHistoryCollapse,
            }">
            <router-view #default="{ Component, route }">
              <Transition
                appear
                :enter-active-class="route.meta.enterClass ?? 'animate__bounceInRight'"
                :leave-active-class="route.meta.leaveClass ?? 'animate__bounceOutLeft'">
                <component :is="Component" class="absolute w-full" />
              </Transition>
            </router-view>
          </main>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
const route = useRoute()
const menuStore = useMenuStore()

menuStore.init('admin')
watch(
  route,
  () => {
    menuStore.addHistoryMenu(route)
  },
  { immediate: true },
)

const closeMenu = () => {
  menuStore.toggleMenu()
}
</script>

<style scoped lang="scss">
.animate__bounceInRight {
  animation-duration: 0.8s;
}

.animate__bounceOutLeft {
  animation-duration: 0.5s;
}

.mask {
  z-index: 99;
  @apply absolute top-0 h-screen w-screen bg-black/50 opacity-20;

  &.close {
    @apply hidden;
  }
}
.main {
  // box-shadow: 0px 0px 14px #a7aaad;
}
// .main::-webkit-scrollbar {
//   display: none;
// }
</style>
