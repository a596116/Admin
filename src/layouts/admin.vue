<template>
  <div>
    <!-- <el-container class="relative"> -->
    <!-- Menu -->
    <!-- <el-scrollbar class="z-[99]! !absolute md:!relative">
        <Menu />
      </el-scrollbar> -->
    <el-container class="relative grid min-h-screen">
      <div
        class="mask md:hidden"
        @click="closeMenu"
        :class="{ close: !menuStore.isMenuCollapse }"></div>
      <div class="content grid w-full grid-rows-[auto_1fr] bg-hd-Bg">
        <div class="p-4">
          <NavBar />
          <!-- <HistoryLink
            class="hidden md:block"
            :class="{ 'md:hidden': !menuStore.isHistoryCollapse }" /> -->
        </div>

        <div class="relative m-8 overflow-y-auto main">
          <router-view #default="{ Component, route }">
            <Transition
              appear
              :enter-active-class="route.meta.enterClass ?? 'animate__bounceInRight'"
              :leave-active-class="route.meta.leaveClass ?? 'animate__bounceOutLeft'">
              <component :is="Component" class="absolute w-full" />
            </Transition>
          </router-view>
        </div>
      </div>
    </el-container>
    <!-- </el-container> -->
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
const route = useRoute()
const menuStore = useMenuStore()

menuStore.init('admin')
watch(
  route,
  async () => {
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

.main::-webkit-scrollbar {
  display: none;
}
</style>
